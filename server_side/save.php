<?php
	
	include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
	
	$nb = 0;

	if(isset($_POST['action']) && isset($_SESSION['id'])) {
		if($_POST['action'] == 'insert' && isset($_POST['what2Add'])) { //adding something
			if($_POST['what2Add'] == 'node' && isset($_POST['board_id']) && is_numeric($_POST['board_id']) && isset($_POST['xPos']) 
				&& is_numeric($_POST['xPos']) && isset($_POST['yPos']) && is_numeric($_POST['yPos']) && isset($_POST['color']) && isset($_POST['icon'])) {
				
				$answer = $bdd->prepare('SELECT user_id 
											FROM boards 
											WHERE id = :boardId AND user_id = :user_id');
				$answer->execute(array('boardId' => $_POST['board_id'],
										'user_id' => $_SESSION['id']));
				$count = 0;
				while($data = $answer->fetch()) $count++; //check if board belongs to the user
				if($count != 0) {
					$req = $bdd->prepare('INSERT INTO nodes(id, board_id, title, text, xPos, yPos, color, icon, date_creation, date_update, ip_creation)
											VALUES(\'\', :boardId, \'Title\', \'Change content...\', :xPos, :yPos, :color, :icon, NOW(), NOW(), :ip)');
					$req->execute(array('boardId' => $_POST['board_id'],
										'xPos' => $_POST['xPos'],
										'yPos' => $_POST['yPos'],
										'color' => $_POST['color'],
										'icon' => $_POST['icon'],
                                        'ip' => $_SERVER['REMOTE_ADDR']));
					echo $bdd->lastInsertId();
				}
				else echo -1;
				$answer->closeCursor();
                return;
			}
			else if($_POST['what2Add'] == 'subtitle' && isset($_POST['node_id']) && is_numeric($_POST['node_id'])
				&& isset($_POST['pos']) && is_numeric($_POST['pos'])) {
					
				$answer = $bdd->prepare('SELECT b.user_id
											FROM nodes n 
											INNER JOIN boards b ON b.id = n.board_id
											WHERE n.id = :nodeId AND b.user_id = :user_id');
				$answer->execute(array('nodeId' => $_POST['node_id'],
										'user_id' => $_SESSION['id']));
				
				$count = 0;
				while($data = $answer->fetch()) $count++;
				if($count != 0) {
					$req = $bdd->prepare('INSERT INTO subtitles(id, node_id, title, text, position, date_creation, date_update, ip_creation)
											VALUES(\'\', :nodeId, \'Subtitle\', \'Change content...\', :position, NOW(), NOW(), :ip)');
					$req->execute(array('nodeId' => $_POST['node_id'],
										'position' => $_POST['pos'],
                                        'ip' => $_SERVER['REMOTE_ADDR']));
					echo $bdd->lastInsertId();
				}
				else echo -1;
				$answer->closeCursor();
                return;
			}
			else if($_POST['what2Add'] == 'tag' && isset($_POST['node_id']) && is_numeric($_POST['node_id'])
				&& isset($_POST['title'])) {
					
				$answer = $bdd->prepare('SELECT b.user_id
											FROM nodes n 
											INNER JOIN boards b ON b.id = n.board_id
											WHERE n.id = :nodeId AND b.user_id = :user_id');
				$answer->execute(array('nodeId' => $_POST['node_id'],
										'user_id' => $_SESSION['id']));
				
				$count = 0;
				while($data = $answer->fetch()) $count++;
				if($count != 0) {
					$req = $bdd->prepare('INSERT INTO tags(id, node_id, title, date_creation)
											VALUES(\'\', :nodeId, :title, NOW())');
					$req->execute(array('nodeId' => $_POST['node_id'],
										'title' => $_POST['title']));
					echo $bdd->lastInsertId();
				}
				else echo -1;
				$answer->closeCursor();
                return;
			}
			else if($_POST['what2Add'] == 'link' && isset($_POST['node1_id']) && is_numeric($_POST['node1_id'])
				&& isset($_POST['node2_id']) && is_numeric($_POST['node2_id'])) {
				
				$answer = $bdd->prepare('SELECT b.user_id
											FROM nodes n
											INNER JOIN boards b ON b.id = n.board_id
											WHERE n.id = :node1_id AND b.user_id = :user_id');
				$answer->execute(array('node1_id' => $_POST['node1_id'],
										'user_id' => $_SESSION['id']));
				
				$count = 0;
				while($data = $answer->fetch()) $count++;
				if($count != 0) {
					$req = $bdd->prepare('INSERT INTO linkbars(id, node1_id, node2_id, date_creation)
											VALUES(\'\', :node1Id, :node2Id, NOW())');
					$req->execute(array('node1Id' => $_POST['node1_id'],
										'node2Id' => $_POST['node2_id']));
					echo $bdd->lastInsertId();
				}
				else echo -1;
				$answer->closeCursor();
                return;
			}
		}
		
		else if($_POST['action'] == 'update'){ //modifying something
			if(isset($_POST['id']) && is_numeric($_POST['id'])) {			
				if(isset($_POST['xPos']) && isset($_POST['yPos']) && is_numeric($_POST['xPos']) && is_numeric($_POST['yPos'])) {
							
					$req = $bdd->prepare('UPDATE nodes n
											INNER JOIN boards b ON b.id = n.board_id
											SET n.xPos = :x, n.yPos = :y, n.date_update = NOW()
											WHERE n.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('x' => $_POST['xPos'],
												'y' => $_POST['yPos'],
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
				}			
				else if(isset($_POST['title']) && isset($_POST['text'])) {	
					
					$req = $bdd->prepare('UPDATE nodes n
											INNER JOIN boards b ON b.id = n.board_id
											SET n.title = :title, n.text = :text, n.date_update = NOW()
											WHERE n.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('title' => nl2br($_POST['title']),
												'text' => nl2br($_POST['text']),
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
				}		
				else if(isset($_POST['subtitle']) && isset($_POST['text'])) {	
						
					$req = $bdd->prepare('UPDATE subtitles s
											INNER JOIN nodes n ON n.id = s.node_id
											INNER JOIN boards b ON b.id = n.board_id
											SET s.title = :subtitle, s.text = :text, s.date_update = NOW()
											WHERE s.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('subtitle' => $_POST['subtitle'],
												'text' => $_POST['text'],
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
				}
				else if(isset($_POST['subtitle_position']) && is_numeric($_POST['subtitle_position'])) {	
						
					$req = $bdd->prepare('UPDATE subtitles s
											INNER JOIN nodes n ON n.id = s.node_id
											INNER JOIN boards b ON b.id = n.board_id
											SET s.position = :position, s.date_update = NOW()
											WHERE s.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('position' => $_POST['subtitle_position'],
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
				}			
				else if(isset($_POST['color'])) {
					
					$req = $bdd->prepare('UPDATE nodes n
											INNER JOIN boards b ON b.id = n.board_id
											SET n.color = :color, n.date_update = NOW()
											WHERE n.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('color' => $_POST['color'],
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
				}
                else if(isset($_POST['icon'])) {
                    $req = $bdd->prepare('UPDATE nodes n
											INNER JOIN boards b ON b.id = n.board_id
											SET n.icon = :icon, n.date_update = NOW()
											WHERE n.id = :id AND b.user_id = :user_id');
					$nb = $req->execute(array('icon' => $_POST['icon'],
												'id' => $_POST['id'],
												'user_id' => $_SESSION['id']));
                }
			}
				
			echo $nb;
		}
		
		else if($_POST['action'] == 'delete' && isset($_POST['what2Del'])) { //deleting stuff
			if($_POST['what2Del'] == 'node' && isset($_POST['node_id']) && is_numeric($_POST['node_id'])) {
				
				$req = $bdd->prepare('DELETE n FROM nodes n
										INNER JOIN boards b ON b.id = n.board_id
										WHERE n.id = :id AND b.user_id = :user_id');
				$nb = $req->execute(array('id' => $_POST['node_id'],
											'user_id' => $_SESSION['id']));
				
				//Also delete related subtitles
				$req = $bdd->prepare('DELETE s FROM subtitles s
										INNER JOIN nodes n ON n.id = s.node_id
										INNER JOIN boards b ON b.id = n.board_id
										WHERE s.node_id = :id AND b.user_id = :user_id');
				$req->execute(array('id' => $_POST['node_id'],
									'user_id' => $_SESSION['id']));
									
				//... and related tags
				$req = $bdd->prepare('DELETE t FROM tags t
										INNER JOIN nodes n ON n.id = t.node_id
										INNER JOIN boards b ON b.id = n.board_id
										WHERE t.node_id = :id AND b.user_id = :user_id');
				$req->execute(array('id' => $_POST['node_id'],
									'user_id' => $_SESSION['id']));
			}
			
			else if($_POST['what2Del'] == 'link' && isset($_POST['link_id']) && is_numeric($_POST['link_id'])) {
				
				$req = $bdd->prepare('DELETE l FROM linkbars l
										INNER JOIN nodes n ON n.id = l.node1_id
										INNER JOIN boards b ON b.id = n.board_id
										WHERE l.id = :id AND b.user_id = :user_id');
				$nb = $req->execute(array('id' => $_POST['link_id'],
											'user_id' => $_SESSION['id']));
			}
			
			else if($_POST['what2Del'] == 'subtitle' && isset($_POST['sub_id']) && is_numeric($_POST['sub_id'])) {
				
				$req = $bdd->prepare('DELETE s FROM subtitles s
										INNER JOIN nodes n ON n.id = s.node_id
										INNER JOIN boards b ON b.id = n.board_id
										WHERE s.id = :id AND b.user_id = :user_id');
				$nb = $req->execute(array('id' => $_POST['sub_id'],
											'user_id' => $_SESSION['id']));
			}
			
			else if($_POST['what2Del'] == 'tag' && isset($_POST['tag_id']) && is_numeric($_POST['tag_id'])) {
				
				$req = $bdd->prepare('DELETE t FROM tags t
										INNER JOIN nodes n ON n.id = t.node_id
										INNER JOIN boards b ON b.id = n.board_id
										WHERE t.id = :id AND b.user_id = :user_id');
				$nb = $req->execute(array('id' => $_POST['tag_id'],
											'user_id' => $_SESSION['id']));
			}
		}
	}

    echo $nb;
