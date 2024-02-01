<!DOCTYPE html>
<html lang="en">

<head>
    <title>Sidebar</title>
    <!-- Link Styles -->
    <link rel="stylesheet" href="<?= ROOT ?>/assets/css/style-bar.css">
    <link rel="stylesheet" href="<?= ROOT ?>/assets/css/delivery/delivery-orders.css">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <!-- Sidebar -->
    <?php include 'sidebar.php' ?>
    <!-- Navigation bar -->

    <?php include 'navigationbar.php' ?>
    <!-- Scripts -->
    <script src="<?= ROOT ?>/assets/js/script-bar.js"></script>

    <!-- content  -->
    <section id="main" class="main">

        <h2>Your Orders</h2>

        <form>
            <div class="form">
                <input class="form-group" type="text" placeholder="Search...">
                <i class='bx bx-search icon'></i>
                <input class="btn" type="button" onclick="openReport()" value="Report Problem">
            </div>

        </form>

        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th class="ordId">OrderId</th>
                    <th class="Name">Customer Name</th>
                    <th class="Distric">District</th>
                    <th class="stth">Status</th>
                    <th></th>
                </tr>
            </thead>

            <?php
            if (isset($data)) {
                // show($data);
                $sn=1;
                foreach ($data as $item) {
                    if ($item->order_status == 'Package_OnWay') {
                        // echo $item->order_status;
                    
            ?>
                    <tr>
                        <td><?php echo $sn++?></td>
                        <td class="ordId"><?php echo $item->order_id?></td>
                        <td class="Name">thiran</td>
                        <td class="Distric"><?php echo $item->district?></td>
                        <td class="stth"><?php echo $item->order_status?></td>
                        <td><button type="submit" name="selectItem"  class="view-order-btn" data-order='<?= json_encode($item); ?>' onclick="openView(this)">View Order</button></td>
                    </tr>

            <?php
                    }
                }
            }

            ?>
        </table>

    </section>


    <!-- POPUP -->
    <div class="popup-report">
        <h2>Report Your Problem</h2>
        <h4>Your name : </h4>
        <input type="text" placeholder="Enter your name">
        <h4>Your email : </h4>
        <input type="text" placeholder="Enter your email">
        <h4>Problem : </h4>
        <textarea name="problem" id="problem" cols="30" rows="10" placeholder="Enter your problem"></textarea>
        <div class="btns">
            <button type="button" class="cancelR-btn" onclick="closeReport()">Cancel</button>
            <button type="button" class="close-btn" onclick="closeReport()">Submit</button>
        </div>
    </div>



    <div class="popup-view" id="popup-view">

        <h2>Order Details</h2>
        <div class="status">

            <ul>
                <li>
                    <iconify-icon icon="streamline:interface-time-stop-watch-alternate-timer-countdown-clock"></iconify-icon>
                    <div class="progress one">

                        <i class="uil uil-check"></i>
                    </div>
                    <p class="text">Package Pending</p>
                </li>

                <li>
                    <iconify-icon icon="game-icons:card-pickup"></iconify-icon>
                    <div class="progress two">

                        <i class="uil uil-check"></i>
                    </div>
                    <p class="text">Package Received</p>
                </li>
                <li>
                    <iconify-icon icon="tabler:truck-delivery"></iconify-icon>
                    <div class="progress three">

                        <i class="uil uil-check"></i>
                    </div>
                    <p class="text">Package On the Way</p>
                </li>
                <li>
                    <iconify-icon icon="mdi:package-variant-closed-check"></iconify-icon>
                    <div class="progress four">

                        <!-- <i class="uil uil-check"></i> -->
                    </div>
                    <p class="text">Package Delivered</p>
                </li>

            </ul>

        </div>

        <div class="container1">
            <form>
                <div class="user-details">
                    <div class="input-box">
                        <span class="details">Order Id </span>
                        <input type="text" required onChange="" readonly value="1" />
                    </div>

                    <div class="input-box">
                        <span class="details">Customer Name </span>
                        <input type="text" required onChange="" readonly value="thiran" />
                    </div>

                    <div class="input-box">
                        <span class="details">Delivery Address</span>
                        <input type="text" required onChange="" readonly value="matara" />
                    </div>

                    <div class="input-box">
                        <span class="details">Order Placed On</span>
                        <input type="text" required onChange="" readonly value="2023/10/19" />
                    </div>

                    <div class="input-box">
                        <span class="details">Delivery Expected On</span>
                        <input type="text" required onChange="" readonly value="2023/10/29" />
                    </div>
                </div>
                <button type="submit" class="update-btn">Update Order</button>
            </form>
        </div>
        <div class="btn-ok">

            <button type="button" class="ok-btn" onclick="closeView()">OK</button>
        </div>



    </div>
    <div id="overlay" class="overlay"></div>




    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <script src="<?= ROOT ?>/assets/js/delivery/delivery-orders.js"></script>
</body>

</html>