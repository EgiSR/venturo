<?php
$data = file_get_contents('data/menu.json');
$menu = json_decode($data, true);

  $json = file_get_contents('data/transaksi.json');
  $arr = json_decode($json, true);
  
  //mulai dari sini
  $rekap =[];
  foreach ($arr as $val) {
    $menu1 = $val['menu'];
    $total = $val['total'];
    $bulan = date('n', strtotime($val['tanggal']));
    if(isset($rekap[$menu1])){
      if(isset($rekap[$menu1][$bulan])){
          $rekap[$menu1][$bulan] += $total;
          $rekap[$menu1]['total'] += $total;
      }else{
        $rekap[$menu1][$bulan] = $total;
        $rekap[$menu1]['total'] += $total;
      }
    }else{
      $rekap[$menu1][$bulan] = $total;
      $rekap[$menu1]['total'] = $total;
    }
  }
   
  echo json_encode($rekap);
?>
