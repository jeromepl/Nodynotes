<?php
    include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
    header('Content-Type: application/json');

	//All matching objects are going to be stored in these variables:
	$results = array();

	if(isset($_SESSION['id']) && isset($_GET['query'])) {

        $_GET['query'] = preg_replace('#[\*\+]#', '', $_GET['query']);

		$answer = $bdd->prepare('SELECT n.*
									FROM nodes n
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND (n.title LIKE :query1 OR n.text LIKE :query2)');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => '%' . $_GET['query'] . '%',
								'query2' => '%' . $_GET['query'] . '%'))
								or die(print_r($bdd->errorInfo()));

		while($data = $answer->fetch()) {
			addEl($results, 'node', $data['id'], $data['board_id'], $data['title'], $data['text']);
		}

		$answer->closeCursor();

		$answer = $bdd->prepare('SELECT s.*, n.board_id
									FROM subtitles s
									INNER JOIN nodes n ON n.id = s.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND (s.title LIKE :query1 OR s.text LIKE :query2)');;
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => '%' . $_GET['query'] . '%',
								'query2' => '%' . $_GET['query'] . '%'))
								or die(print_r($bdd->errorInfo()));

		while($data = $answer->fetch()) {
			addEl($results, 'subtitle', $data['id'], $data['board_id'], $data['title'], $data['text']);
		}

		$answer->closeCursor();

        $answer = $bdd->prepare('SELECT t.title tag_title, n.*
									FROM tags t
									INNER JOIN nodes n ON n.id = t.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE b.user_id = :user_id AND t.title LIKE :query1');
		$answer->execute(array('user_id' => $_SESSION['id'],
								'query1' => '%' . $_GET['query'] . '%'))
								or die(print_r($bdd->errorInfo()));

		while($data = $answer->fetch()) {
			addEl($results, 'tag', $data['id'], $data['board_id'], $data['title'], $data['text']);
		}

		$answer->closeCursor();

		echo json_encode($results); //result is sent back to the javascript page as JSON
	}

	function addEl(&$elArray, $type, $id, $board_id, $title, $text) {
        $elArray[] = array(); //add an element(an array) to the array
        $current = count($elArray) - 1;
        $elArray[$current]['id'] = $id;
        $elArray[$current]['board_id'] = $board_id;
        $elArray[$current]['title'] = escapeHtml($title); //add the title and text to the element in the array
        $elArray[$current]['text'] = escapeHtml($text, true);
        if ($type == 'node' || $type == 'tag') $elArray[$current]['type'] = 'node';
        else $elArray[$current]['type'] = 'subtitle';
	}

    function escapeHtml($text, $keepBR = false) { //instead of htmlspecialchars since this last one also changes the single and double quotes ' and " ($keepBR is optional)
        $text = str_replace(">", "&gt;", str_replace("<", "&lt;", str_replace("&", "&amp", $text)));
        if($keepBR)
            return str_replace("&lt;br&gt;", "<br>", $text); //keep the <br> tags intact for proper display
        else
            return $text;
    }
