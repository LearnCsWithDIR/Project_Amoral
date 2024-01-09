<?php

class CustomerOrders extends Controller
{
    public function index()
    {
        

        $username = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;
        
        $order = new Order;
        
        if ($username != 'User') {
            
            $id = ['user_id' => $_SESSION['USER']->id];
            $data = $order->where($id);

            // show($data);

            if (isset($_POST['updateOrder'])){
                $order_id = $_POST['order_id'];
                
                unset($_POST['updateOrder']);
                $arr = $_POST;
                if (isset($arr)){
                    show($arr);
                    $update = $order->update($order_id, $arr, 'order_id');
                    redirect('customer/orders');
                }
            }
            
            $this->view('customer/orders', $data);

            $errors = [];
            if (isset($_POST['report'])) {
                show($_POST['report']);
                // unset($_SESSION['errors']);
                $title = filter_var($_POST['title'], FILTER_SANITIZE_STRING);
                if(empty($title)){
                    $errors['title'] = 'Title is required.';
                }

                $description = filter_var($_POST['description'], FILTER_SANITIZE_STRING);
                if (empty($description)) {
                    $errors['desc'] = 'Description is required.';
                }
            
                $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                if (empty($email)) {
                    $errors['email'] = 'Email is required.';
                } 
                elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                    $errors['email'] = 'Email is not valid.';
                }
        
                if (empty($errors)) {
                    $report = new CustomerReport;
                    
                    $_POST['user_id'] = $id['user_id'];
    
                    $_POST['report_date'] = date('Y-m-d');
                    
                    if (isset($_POST['user_id'])) {

                        $report->insert($_POST);
                        unset($_POST['report']);
                        // redirect('customer/orders');
        
                    }                
                } else {
                    $_SESSION['errors'] = $errors;
                    
                    $errors = array();
                    $_SESSION['form_data'] = $_POST;
                    $_SESSION['form_id'] = "report";

                    show($_SESSION['errors']);
                    show($_SESSION['form_data']);
                    show($_SESSION['form_id']);
                    unset($_POST);
                    // redirect('customer/orders');
                }
            }else{
      
            }
        } else {
            redirect('home');
        }

    }
}
