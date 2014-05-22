<?php

	include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
	
	//TO BE REMOVED
	$_POST['query'] = "+color*";
	$_SESSION['id'] = 1;
	
	//All matching objects are going to be store in these variables:
	$nodes = array();
	$subtitles = array();
	
	if(isset($_SESSION['id']) && isset($_POST['query'])) {
		$answer = $bdd->prepare('SELECT n.*,
									MATCH(n.title, n.text) AGAINST(:query1 IN BOOLEAN MODE) AS score
									FROM nodes n
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND MATCH(n.title, n.text) AGAINST(:query2 IN BOOLEAN MODE) ORDER BY score DESC');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => $_POST['query'],
								'query2' => $_POST['query'])) 
								or die(print_r($bdd->errorInfo()));
									
		while($data = $answer->fetch()) {
			addEl($nodes, $data['id'], $data['title'], $data['text'], $data['score']);
		}
		
		$answer->closeCursor();
		
		$answer = $bdd->prepare('SELECT s.*,
									MATCH(s.title, s.text) AGAINST(:query1 IN BOOLEAN MODE) AS score
									FROM subtitles s
									INNER JOIN nodes n ON n.id = s.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND MATCH(s.title, s.text) AGAINST(:query2 IN BOOLEAN MODE) ORDER BY score DESC');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => $_POST['query'],
								'query2' => $_POST['query'])) 
								or die(print_r($bdd->errorInfo()));
									
		while($data = $answer->fetch()) {
			addEl($subtitles, $data['id'], $data['title'], $data['text'], $data['score']);
		}
		
		$answer->closeCursor();
		
		//merge the subtitles and nodes
		$result = merge($nodes, $subtitles);
		
		foreach($result as $key => $el) {
			print('<b>' . $el['type'] . ': ' . $el['title'] . ', ' . $el['score'] . '</b><br>');
			print('<p>' . $el['text'] . '</p>');
		}
		
		echo json_encode($result);
	}
	
	function addEl(&$elArray, $id, $title, $text, $score) {
		if(!in_array($id, $elArray)) { //prevents duplicates
			$elArray[] = array(); //add an element to the array
			$current = count($elArray)-1;
			$elArray[$current]['id'] = $id;
			$elArray[$current]['title'] = stripslashes(strip_tags($title)); //add the title and text to the element in the array
			$elArray[$current]['text'] = stripslashes(strip_tags($text));
			$elArray[$current]['score'] = $score;
			//type is added when merging arrays
		}
	}
	
	function merge($l1, $l2) {
		$i1 = 0; $i2 = 0; $i3 = 0;
		$temp = array();
		while ($i1 <= count($l1)-1 && $i2 <= count($l2)-1) {
			if ($l1[$i1]['score'] > $l2[$i2]['score']) {
				$temp[$i3] = array();
				$temp[$i3] = $l1[$i1++];
				$temp[$i3++]['type'] = 'N';
			}
			else {
				$temp[$i3] = array();
				$temp[$i3] = $l2[$i2++];
				$temp[$i3++]['type'] = 'S';
			}
		}

		while ($i1 <= count($l1)-1) {
			$temp[$i3] = array();
			$temp[$i3] = $l1[$i1++];
			$temp[$i3++]['type'] = 'N';
		}

		while ($i2 <= count($l2)-1) {
			$temp[$i3] = array();
			$temp[$i3] = $l2[$i2++];
			$temp[$i3++]['type'] = 'S';
		}
		
		return $temp;
	}
		
	//$words = preg_split("#\\s+#", $_POST['query'], NULL, PREG_SPLIT_NO_EMPTY);
		