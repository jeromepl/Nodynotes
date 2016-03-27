<?php

    //NOTE: THIS CODE IS NOT WORKING ON THE HOSTGATOR'S SERVERS BECAUSE IT USES A NEWER VERSION OF MYSQL

	include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
    header('Content-Type: application/json');
	
	//All matching objects are going to be stored in these variables:
	$nodes = array();
	$subtitles = array();
	
    //TODO Add option to search in the current board (And if user is not connected) instead of all of them

	if(isset($_SESSION['id']) && is_numeric($_SESSION['id']) && isset($_GET['query'])) {
		$answer = $bdd->prepare('SELECT n.*,
									MATCH(n.title, n.text) AGAINST(:query1 IN BOOLEAN MODE) AS score
									FROM nodes n
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND MATCH(n.title, n.text) AGAINST(:query2 IN BOOLEAN MODE) ORDER BY score DESC');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => $_GET['query'],
								'query2' => $_GET['query']))
								or die(print_r($bdd->errorInfo()));
									
		while($data = $answer->fetch()) {
			addEl($nodes, 'node', $data['id'], $data['board_id'], $data['title'], $data['text'], $data['score']);
		}
		
		$answer->closeCursor();
		
		$answer = $bdd->prepare('SELECT s.*, n.board_id,
									MATCH(s.title, s.text) AGAINST(:query1 IN BOOLEAN MODE) AS score
									FROM subtitles s
									INNER JOIN nodes n ON n.id = s.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND MATCH(s.title, s.text) AGAINST(:query2 IN BOOLEAN MODE) ORDER BY score DESC');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => $_GET['query'],
								'query2' => $_GET['query']))
								or die(print_r($bdd->errorInfo()));
									
		while($data = $answer->fetch()) {
			addEl($subtitles, 'subtitle', $data['id'], $data['board_id'], $data['title'], $data['text'], $data['score']);
		}

		$answer->closeCursor();

        $answer = $bdd->prepare('SELECT t.title tag_title, n.*,
									MATCH(t.title) AGAINST(:query1 IN BOOLEAN MODE) AS score
									FROM tags t
									INNER JOIN nodes n ON n.id = t.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND MATCH(t.title) AGAINST(:query2 IN BOOLEAN MODE) ORDER BY score DESC');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => $_GET['query'],
								'query2' => $_GET['query']))
								or die(print_r($bdd->errorInfo()));

		while($data = $answer->fetch()) {
			addEl($nodes, 'tag', $data['id'], $data['board_id'], $data['title'], $data['text'], $data['score']);
		}
		
		$answer->closeCursor();
		
		//merge the subtitles and nodes
		$result = merge($nodes, $subtitles);
		
		echo json_encode($result); //result is sent back to the javascript page as JSON
	}
	
	function addEl(&$elArray, $type, $id, $board_id, $title, $text, $score) {
        $keyInArray = ($type == 'tag')? id_in_array($id, $elArray) : false; //if it's a tag and the node is already in the array, skip to 'else' statement
        if(!$keyInArray) {
            $elArray[] = array(); //add an element(an array) to the array
            $current = count($elArray) - 1;
            $elArray[$current]['id'] = $id;
            $elArray[$current]['board_id'] = $board_id;
            $elArray[$current]['title'] = escapeHtml($title); //add the title and text to the element in the array
            $elArray[$current]['text'] = escapeHtml($text, true);
            $elArray[$current]['score'] = $score;
            if ($type == 'node' || $type == 'tag') $elArray[$current]['type'] = 'node';
            else $elArray[$current]['type'] = 'subtitle';
        }
        else { //add the scores
            $elArray[$keyInArray]['score'] += $score;
            sortElement($elArray, $keyInArray); //resort the newly modified element base on its new score
        }
	}

    function sortElement(&$elArray, $keyEl) {
        //No need to take care of the event where the element would be too high in the array since the score is always going to increase
        //if the element is too low in the array
        while($keyEl > 0 && $elArray[$keyEl]['score'] > $elArray[$keyEl - 1]['score']) { //the array is sorted decreasingly
            $temp = $elArray[$keyEl - 1];
            $elArray[$keyEl - 1] = $elArray[$keyEl];
            $elArray[$keyEl] = $temp;
            $keyEl -= 1;
        }
    }
	
	function merge($l1, $l2) {
		$i1 = 0; $i2 = 0; $i3 = 0;
		$temp = array();
		while ($i1 <= count($l1)-1 && $i2 <= count($l2)-1) {
			if ($l1[$i1]['score'] > $l2[$i2]['score']) {
				$temp[$i3] = array();
				$temp[$i3++] = $l1[$i1++];
			}
			else {
				$temp[$i3] = array();
				$temp[$i3++] = $l2[$i2++];
			}
		}

		while ($i1 <= count($l1)-1) {
			$temp[$i3] = array();
			$temp[$i3++] = $l1[$i1++];
		}

		while ($i2 <= count($l2)-1) {
			$temp[$i3] = array();
			$temp[$i3++] = $l2[$i2++];
		}
		
		return $temp; //returns the merged and sorted array
	}

    function id_in_array($id, &$array) { //function to determine if the node id is already in the array
        foreach ($array as $key => $item) {
            if ($item['type'] == 'node' && $item['id'] == $id) {
                return $key; //return a the array key to the node
            }
        }
        return null;
    }

    function escapeHtml($text, $keepBR = false) { //instead of htmlspecialchars since this last one also changes the single and double quotes ' and " ($keepBR is optional)
        $text = str_replace(">", "&gt;", str_replace("<", "&lt;", str_replace("&", "&amp", $text)));
        if($keepBR)
            return str_replace("&lt;br&gt;", "<br>", $text); //keep the <br> tags intact for proper display
        else
            return $text;
    }
		
	//NOTE If splitting words is ever necessary: $words = preg_split("#\\s+#", $_GET['query'], NULL, PREG_SPLIT_NO_EMPTY);
