<?php

class Orders extends Controller
{
    public function index()
    {

        $username = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;
        $emp_id=$_SESSION['USER']->emp_id;

        // if ($username != 'User') {

        $order = new Order;
        // find all delivery orders
        // $result = $order->where(['order_status'=>"delivering"]);

        $column_names = [];
        $column_names[0] = "users.fullname";
        $column_names[1] = "users.phone";
        $column_names[2] = "orders.order_id";
        $column_names[3] = "orders.city";
        $column_names[4] = "orders.order_status";
        $column_names[5] = "orders.dispatch_date";
        $column_names[6] = "orders.order_placed_on";
        $column_names[7] = "orders.latitude";
        $column_names[8] = "orders.longitude";
        $column_names[9] = "orders.deliver_id";


        $result = $order->find_withInner(['order_status' => "delivering", 'deliver_id' => $emp_id], "users", "user_id", "id", $column_names);

        // show($result);

        $data['data1'] = $result;
        // show($data);
        if (isset($_POST['confirm']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
            unset($_POST['confirm']);
            $_POST['order_status'] = 'delivered';

            $order->update($_POST['order_id'], $_POST, 'order_id');
            redirect('delivery/orders');

        }

        // show($_POST);


        $this->view('delivery/orders', $data);
        // } else {
        //     redirect('home');
        // }
    }

    public function updateStatus()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_id'], $_POST['order_status'])) {
            $order_id = $_POST['order_id'];
            $status = $_POST['order_status'];  // 'delivered' status can be set here or from AJAX
// show($order_id);
            $order = new Order;
            $update = $order->update($order_id, ['order_status' => $status], 'order_id');

            if ($update) {
                echo json_encode(['status' => 'success', 'message' => 'Order status updated successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update order status']);
            }
            exit; // Prevent further processing
        }
    }
    
}
