<?php

class AssignDelivery extends Controller{
    public function index(){
        $order = new Order();
        $employee = new Employee;
        $deliveryman = new Deliveryman;
        $order_material = new OrderMaterial;

        $data['pending_orders'] = $order->where(['order_status' => 'sewed', 'is_delivery' => 1, 'deliver_id' => 0]);
        $data['assigned_orders'] = $order->where(['order_status' => 'delivering', 'is_delivery' => 1],['deliver_id' => 0]);
        $data['sizes'] = $order_material->findAll();
        $data['deliveryman'] = $deliveryman->findAll_withLOJ('employee','emp_id','emp_id');
        // show($data);
        $this->view('manager/assigndelivery', $data);
    }

    public function assignDeliverymen(){
        $username = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;

        $order = new Order;
        // var_dump($_POST);
        $response = [];
        if(isset($_POST) && $_SESSION['USER']->emp_status == 'manager'){
            $updated_orders = $_POST['order_id'];
            foreach($updated_orders as $order_id){
                // var_dump($order_id);
                // var_dump($_POST['deliveryman']);
                $response = $order->update($order_id, ['deliver_id' => $_POST['deliveryman'], 'order_status' => 'delivering'], 'order_id' );
            }
        }
        echo json_encode($response);

    }
}