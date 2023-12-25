<?php

class SignIn extends Controller
{

    public function index()
    {

        $user = new User;
        $employee = new Employee;

        if (isset($_SESSION['USER'])) {

            unset($_SESSION['USER']);
        } else {
            isset($_SESSION['USER']);
        }


        // ---------------------------- --------------------------------
        // All users Sign In to the their overviews 
        // ---------------------------- --------------------------------
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signIn'])) {


            if ($user->signInData($_POST)) {

                $arr['email'] = $_POST['email'];

                $row = $user->first($arr);

                $emprow = $employee->first($arr);


                if ($row) {

                    $checkpassword = password_verify($_POST['password'], $row->password);

                    if ($checkpassword == true) {

                        unset($row->password);

                        $_SESSION['USER'] = $row;

                        // check session user
                        $username  = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;


                        if ($row->user_status == 'customer') {
                            redirect('customer/overview');
                        }
                    } else {
                        $error = "Invalid Email or Password";

                        $passData = 'email=' . $_POST['email'] . '&pass=' . $_POST['password'];
                        $errors = 'flag=' . 1 . '&error=' . $error . '&error_no=' . 7;

                        unset($_POST['signIn']);

                        redirect("signin?$errors&$passData");
                        exit;
                    }
                } elseif ($emprow) {

                    $checkpassword = password_verify($_POST['password'], $emprow->password);

                    if ($checkpassword) {

                        unset($emprow->password);
                        $_SESSION['USER'] = $emprow;

                        // check session user
                        $username = empty($_SESSION['USER']) ? 'User' : $_SESSION['USER']->email;


                        if ($emprow->emp_status == 'manager') {

                            redirect('manager/overview');
                        } else if ($emprow->emp_status == 'delivery') {
                            redirect('delivery/overview');
                        } else  if ($emprow->emp_status == 'garment') {
                            redirect('garment/overview');
                        } else  if ($emprow->emp_status == 'merchandiser') {
                            redirect('garment/overview');
                        }
                    } else {

                        $error = "Invalid Email or Password";

                        $passData = 'email=' . $_POST['email'] . '&pass=' . $_POST['password'];
                        $errors = 'flag=' . 1 . '&error=' . $error . '&error_no=' . 7;

                        unset($_POST['signIn']);

                        redirect("signin?$errors&$passData");
                        exit;
                    }
                } else {

                    $error = "Invalid Email or Password";

                    $passData = 'email=' . $_POST['email'] . '&pass=' . $_POST['password'];
                    $errors = 'flag=' . 1 . '&error=' . $error . '&error_no=' . 7;

                    unset($_POST['signIn']);

                    redirect("signin?$errors&$passData");
                    exit;
                }
            }
        }

        // ---------------------------- --------------------------------
        // All customers are Sign Up to the System 
        // ---------------------------- --------------------------------

        else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signUp'])) {

            $this->userRegister($user, $employee, $_POST);
           
        }


        $data['errors'] = $user->errors;


        // ---------------------------- --------------------------------
        // If found the errors at data validation time then , Sign Up & Sign In redirect pages 
        // ---------------------------- --------------------------------

        if (!empty($data['errors']) && isset($_POST['signUp'])) {

            $passData = 'name=' . $_POST['fullname'] . '&email=' . $_POST['email'] . '&pass=' . $_POST['password'] . '&repass=' . $_POST['re-password'];
            $error = 'flag=' . $data['errors']['flag'] . '&error=' . $data['errors']['error'] . '&error_no=' . $data['errors']['error_no'];

            unset($_POST['signUp']);

            redirect("signup?$error&$passData");
            exit;
        } else if (!empty($data['errors']) && isset($_POST['signIn'])) {
            $passData = 'email=' . $_POST['email'] . '&pass=' . $_POST['password'];
            $error = 'flag=' . $data['errors']['flag'] . '&error=' . $data['errors']['error'] . '&error_no=' . $data['errors']['error_no'];

            unset($_POST['signIn']);

            redirect("signin?$error&$passData");
            exit;
        }

        $this->view('signin', $data);
    }

    // ---------------------------- --------------------------------
    // All customers are Sign Up to the System 
    // ---------------------------- --------------------------------
    private function userRegister($user, $employee, $POST)
    {
        $email = $POST['email'];
        $password = $POST['password'];
        $re_password = $POST['re-password'];

        if ($user->validate($_POST)) {

            unset($POST['signUp']);
            unset($POST['re-password']);

            //check the email used or not
            if (!$user->findUser($POST) && !$employee->findUser($POST)) {

                // Generate a random verification code
                $verificationCode = mt_rand(100000, 999999);

                $POST['email_otp'] = $verificationCode;
                $POST['password'] =$_POST['password'] ;

                $sendmail = new SendMail;

                $res = $sendmail->sendVerificationEmail($email, $verificationCode);

                $response = $user->insert($POST);

                $msg = "Sign Up Successfull..";
                $success = 'flag=' . 0 . '&success=' . $msg . '&success_no=' . 1 .'&send='. $res;


                redirect("signin?$success");
                exit;
            } else {
                $error = "Email is Already in use";
                $errors = 'flag=' . 1 . '&error=' . $error . '&error_no=' . 3;

                $passData = 'name=' . $POST['fullname'] . '&email=' . $email . '&pass=' . $password . '&repass=' . $re_password;

                redirect("signup?$errors&$passData");
                exit;
            }
        }
    }
}

// all data unset method
// foreach ($_POST as $key => $value) {
//     unset($_POST[$key]);
// }
