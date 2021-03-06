<?php
	include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
	
	$nb = 0;
	
	if(isset($_POST['action']) && isset($_SESSION['id']) && is_numeric($_SESSION['id'])) {
		
		if($_POST['action'] == 'insert' && isset($_POST['title']) && isset($_POST['public'])) {
			
			$req = $bdd->prepare('INSERT INTO boards(user_id, title, xPos, yPos, date_creation, date_seen, views, ip_creation, public)
									VALUES(:user_id, :title, 0, 0, NOW(), NOW(), 0, :ip, :public)');
			$req->execute(array('user_id' => $_SESSION['id'],
								'title' => $_POST['title'],
                                'ip' => $_SERVER['REMOTE_ADDR'],
                                'public' => $_POST['public']));
			
			$id = $bdd->lastInsertId();
            $req->closeCursor();
            
            //Also insert a node:
            $req = $bdd->prepare('INSERT INTO nodes(board_id, title, text, xPos, yPos, color, icon, date_creation, date_update, ip_creation)
									VALUES(:board_id, :title, \'\', 0, 0, \'00d7dd\', \'none\', NOW(), NOW(), :ip)');
			$req->execute(array('board_id' => $id,
								'title' => $_POST['title'],
                                'ip' => $_SERVER['REMOTE_ADDR']));
			
            $req->closeCursor();
            
            echo $id; //Returns the board id
            return;
		}
		
		else if($_POST['action'] == 'update') {
			if(isset($_POST['title']) && isset($_POST['board_id']) && is_numeric($_POST['board_id'])) {
				
				$req = $bdd->prepare('UPDATE boards 
										SET title = :title
										WHERE id = :board_id AND user_id = :user_id');
				$nb = $req->execute(array('title' => $_POST['title'],
											'board_id' => $_POST['board_id'],
											'user_id' => $_SESSION['id']));
			}
			
			else if(isset($_POST['board_id']) && isset($_POST['xPos']) && isset($_POST['yPos']) 
				&& is_numeric($_POST['board_id']) && is_numeric($_POST['xPos']) && is_numeric($_POST['yPos'])) {
					
				$req = $bdd->prepare('UPDATE boards
										SET xPos = :xPos, yPos = :yPos
										WHERE id = :board_id AND user_id = :user_id');
				$nb = $req->execute(array('xPos' => $_POST['xPos'],
											'yPos' => $_POST['yPos'],
											'board_id' => $_POST['board_id'],
											'user_id' => $_SESSION['id']));
			}

            else if(isset($_POST['public']) && ($_POST['public'] == 'T' || $_POST['public'] == 'F')) {
                $req = $bdd->prepare('UPDATE boards
										SET public = :public
										WHERE id = :board_id AND user_id = :user_id');
				$nb = $req->execute(array('public' => $_POST['public'],
											'board_id' => $_POST['board_id'],
											'user_id' => $_SESSION['id']));
            }
			
			echo $nb;
            return;
		}
		
		else if($_POST['action'] == 'delete' && isset($_POST['board_id']) && is_numeric($_POST['board_id'])) {
			
			$req = $bdd->prepare('DELETE FROM boards
									WHERE id = :id AND user_id = :user_id');
			$nb = $req->execute(array('id' => $_POST['board_id'],
										'user_id' => $_SESSION['id']));
										
			
			//Also delete all nodes, subtitles, tags and link bars in this board
			$req = $bdd->prepare('DELETE n FROM nodes n
									INNER JOIN boards b ON b.id = n.board_id
									WHERE n.board_id = :id AND b.user_id = :user_id');
			$req->execute(array('id' => $_POST['board_id'],
								'user_id' => $_SESSION['id']));
								
			$req = $bdd->prepare('DELETE s FROM subtitles s
									INNER JOIN nodes n ON n.id = s.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE n.board_id = :id AND b.user_id = :user_id');
			$req->execute(array('id' => $_POST['board_id'],
								'user_id' => $_SESSION['id']));
								
			$req = $bdd->prepare('DELETE t FROM tags t
									INNER JOIN nodes n ON n.id = t.node_id
									INNER JOIN boards b ON b.id = n.board_id
									WHERE n.board_id = :id AND b.user_id = :user_id');
			$req->execute(array('id' => $_POST['board_id'],
								'user_id' => $_SESSION['id']));
								
			$req = $bdd->prepare('DELETE l FROM linkbars l
									INNER JOIN nodes n ON (n.id = l.node1_id OR n.id = l.node2_id)
									INNER JOIN boards b ON b.id = n.board_id
									WHERE n.board_id = :id AND b.user_id = :user_id');
			$req->execute(array('id' => $_POST['board_id'],
								'user_id' => $_SESSION['id']));					
									
			echo $nb;
            return;
		}
	}
