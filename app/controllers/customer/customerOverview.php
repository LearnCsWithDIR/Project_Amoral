<?php

class customerOverview extends Controller
{
    public function index($a = '', $b = '', $c = '')
    {
        // echo "this is a about controller";
        $this->view('customer/overview');
    }
}
