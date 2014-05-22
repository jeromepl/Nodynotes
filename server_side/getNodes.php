<?php

	include_once("mySQL_connection.php"); //where $bdd is set

	$post_data = array();
	$post_data['nodes'] = array();
	$post_data['linkBars'] = array();
	
	if(isset($_GET['board_id']) && is_numeric($_GET['board_id'])) {
		
		$answer1 = $bdd->prepare('SELECT * FROM nodes WHERE board_id = :board_id ORDER BY id DESC');
		$answer1->execute(array('board_id' => $_GET['board_id'])) or die(print_r($bdd->errorInfo()));
		
		while($data1 = $answer1->fetch()) {
			
			$key = count($post_data['nodes']);
			$post_data['nodes'][] = $key;
			$post_data['nodes'][$key] = array();
			$post_data['nodes'][$key]['title'] = stripslashes(strip_tags($data1['title'])); //stripslashes is the opposite of addslashes
			$post_data['nodes'][$key]['text'] = stripslashes(strip_tags($data1['text'], '<br>')); //allow <br> tags for the text
			$post_data['nodes'][$key]['color'] = stripslashes(strip_tags($data1['color'])); //cannot use htmlspecialchars because error with json_encode
			$post_data['nodes'][$key]['xPos'] = $data1['xPos'];
			$post_data['nodes'][$key]['yPos'] = $data1['yPos'];
			$post_data['nodes'][$key]['id'] = $data1['id'];
			$post_data['nodes'][$key]['icon'] = $data1['icon'];
			$post_data['nodes'][$key]['subtitles'] = array();
			$post_data['nodes'][$key]['tags'] = array();
				
			$answer2 = $bdd->prepare('SELECT * FROM subtitles WHERE node_id = :nodeId ORDER BY position');
			$answer2->execute(array('nodeId' => $data1['id'])) or die(print_r($bdd->errorInfo()));
			while($data2 = $answer2->fetch()) {
					
				$sub_key = count($post_data['nodes'][$key]['subtitles']);
				$post_data['nodes'][$key]['subtitles'][] = $sub_key;
				$post_data['nodes'][$key]['subtitles'][$sub_key] = array();
				$post_data['nodes'][$key]['subtitles'][$sub_key]['id'] = $data2['id'];
				$post_data['nodes'][$key]['subtitles'][$sub_key]['position'] = $data2['position'];
				$post_data['nodes'][$key]['subtitles'][$sub_key]['title'] = stripslashes(strip_tags($data2['title']));
				$post_data['nodes'][$key]['subtitles'][$sub_key]['text'] = stripslashes(strip_tags($data2['text'], '<br>'));
			}
			$answer2->closeCursor();
			
			$answer2 = $bdd->prepare('SELECT * FROM tags WHERE node_id = :nodeId');
			$answer2->execute(array('nodeId' => $data1['id'])) or die(print_r($bdd->errorInfo()));
			while($data2 = $answer2->fetch()) {
					
				$sub_key = count($post_data['nodes'][$key]['tags']);
				$post_data['nodes'][$key]['tags'][] = $sub_key;
				$post_data['nodes'][$key]['tags'][$sub_key] = array();
				$post_data['nodes'][$key]['tags'][$sub_key]['id'] = $data2['id'];
				$post_data['nodes'][$key]['tags'][$sub_key]['title'] = stripslashes(strip_tags($data2['title']));
			}
			$answer2->closeCursor();
			
			$answer3 = $bdd->prepare('SELECT * FROM linkbars WHERE (node1_id = :nodeId1 OR node2_id = :nodeId2)');
			$answer3->execute(array('nodeId1' => $data1['id'], 'nodeId2' => $data1['id'])) or die(print_r($bdd->errorInfo()));
			while($data3 = $answer3->fetch()) {
				
				$link_key = count($post_data['linkBars']);
				
				if($data3['node1_id'] > $data1['id'] || $data3['node2_id'] > $data1['id']) {	
					$post_data['linkBars'][] = $link_key;
					$post_data['linkBars'][$link_key] = array();
					$post_data['linkBars'][$link_key]['id'] = $data3['id'];
					$post_data['linkBars'][$link_key]['node1_id'] = $data3['node1_id'];
					$post_data['linkBars'][$link_key]['node2_id'] = $data3['node2_id'];
				}
			}
			$answer3->closeCursor();
		}
		$answer1->closeCursor();
	}
	file_put_contents ( "text.json" , json_encode($post_data) );
	echo json_encode($post_data);