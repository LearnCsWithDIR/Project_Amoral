<?php

$username = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;

route('signin', 'SignIn@index');

route('customer/overview', 'customer/customerOverview@index');
route('customer/orders', 'customer/customerOrders@index');
route('logout', 'Logout@index');

route('home', 'Home@index');


route('manager/overview', 'manager/Overview@index');
route('manager/profile', 'manager/Profile@index');
route('manager/employeedetails', 'manager/EmployeeDetails@index');

route('garment/overview', 'garment/Overview@index');
route('garment/orders', 'garment/Orders@index');
route('garment/profile', 'garment/Profile@index');

route('delivery/orders', 'delivery/Orders@index');


route('customer/customer-orders', 'customer/customerOverview@index');
route('customer/orders', 'customer/customerOrders');

route('manager/overview','manager/Overview@index');
route('manager/profile','manager/Profile@index');
route('manager/employeedetails','manager/EmployeeDetails@index');


route('signinData', 'SignIn@formData');
