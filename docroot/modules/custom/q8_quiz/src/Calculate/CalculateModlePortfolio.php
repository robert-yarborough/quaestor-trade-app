<?php 

class CalculateModulePortfolio {

  public static function Calculate(string $fquestions, string $fanswers, string $fsecond) {
    $modelPortfolio = array();
    $retstring= array();
    $answers=array();
    $modelPortfolio[1]="CONSERVATIVE";
    $modelPortfolio[2]="MODERATELY CONSERVATIVE";
    $modelPortfolio[3]="MODERATE";
    $modelPortfolio[4]="BALANCED";
    $modelPortfolio[5]="MODERATE GROWTH";
    $modelPortfolio[6]="MODERATELY AGGRESSIVE";
    $modelPortfolio[7]="AGGRESSIVE";
    if ((!is_file($fquestions))&&(!file_exists($fquestions))) {
      echo "Question ".$fquestions." File Dose not exist ".$fquestions."<BR>";
      return;
    }
    $questions = file($fquestions, FILE_IGNORE_NEW_LINES);

    for ($i = 0; $i < count($questions); $i++) {
      if (count(explode(',', $questions[$i]))<4)
      {
        echo "Wrong question format "+$questions[$i]."<BR>";
        echo "used  four separators  ,,,, " ."<BR>";
        return;
      }
      //			print $value."<BR>";
      if ($i>=1)
      {
        $que=explode(',', $questions[$i]);
        for ( $j=0;$j<4;$j++)
        {
          if (!ctype_digit($que[$j]))
          {
            echo "Wrong question format ".$questions[$i]."<BR>";
            echo "Use integer values " ."<BR>";
            return;
          }
        }
      }
    }
    //	echo  $lines;
//            echo  $fquestions;
    echo "<BR>";

//			$array1= array(2,3);
    //		echo '<pre>'; print_r($array1); echo '</pre>';

    if (count(explode(',', $fanswers))>6)
    {
      array_push($answers,"");
      array_push($answers,$fanswers);
      if (count(explode(',', $fsecond))>4)
        $answers[1]=$answers[1].','.$fsecond;

    }
    else
    {
      if ((!is_file($fanswers))&&(!file_exists($fanswers)))
      {
        echo "Answers set I ".$fanswers." File Dose not exist "."<BR>";
        return;
      }
      $answers = file($fanswers, FILE_IGNORE_NEW_LINES);
      if (!empty($fsecond)) {
        if ((!is_file($fsecond))&&(!file_exists($fsecond)))
        {
          echo "Answers set II ".$fsecond." File Dose not exist "."<BR>";
          return;
        }
        $secanswers = file($fsecond, FILE_IGNORE_NEW_LINES);
        unset($secanswers[0]);
        $cnt=1;
        foreach ($secanswers as $value)
        {
          $sec=explode(',', $value);
          unset($sec[0]);
          $answers[$cnt]=$answers[$cnt].','.implode(',',$sec);
          $cnt++;
        }
      }

    }
    echo "<BR>";
    for ($i = 1; $i < count($answers); $i++) {

      $ans = explode(',', $answers[$i]);
      echo $answers[$i]."<BR>";
      if  (count($ans)<5)
      {
        echo "Wrong answer format ".$answers[$i]."Count ".count($ans)."<BR>";
        echo "used four separators  ,,,, " ."<BR>";
        echo "Sample" ."<BR>";
        echo "Serial2 2,1,5,4,4,2,1,5,4,4,5,1,2,3,4,5,1,2" ."<BR>";
        return ;
      }
      if (count($ans)>count($questions))
      {
        echo "Number of answers [".count($ans)+"] is more than number of questions ".count($questions) ;
        echo "Answer is ".$answers[$i]."<BR>";
        return;
      }


      for ($j = 1; $j < count($ans); $j++) {
        $que=explode(',' , $questions[$j]);
        if ( $ans[$j] > $que[3])
        {
          echo "Answer [".$ans[$j]."] is more than total number of answers ["+$que[3]."]"."<BR>";
          echo "Answer is ".$answers[$i]."<BR>";
          return ;
        }
      }
    }
    for ($k = 1; $k < count($answers); $k++) {
      $totalsum1 = array();

      $qn=1;
      $col1 = explode(',', $answers[$k]);

      for ($i = 1; $i < count($col1); $i++) {

        $que = explode(',', $questions[$qn]);
        //echo '<pre>'; print_r($que); echo '</pre>';
        $tmp2=$que[2]*$col1[$i]*$que[0]/$que[3];
        $tmp3=$que[2];
        //	echo $tmp2.'<BR>';
        if (array_key_exists($que[0],$totalsum1))
        {
          $tmp1=$totalsum1[$que[0]];
          $totalsum1[$que[0]]= array($tmp1[0]+$tmp2,$tmp1[1]+$tmp3);
        }
        else
          $totalsum1[$que[0]]=array($tmp2,$tmp3);

        $qn++;
        //echo $i."<BR>";
      }
      $modport=-1;
      //$totpo=0;
      foreach ($totalsum1 as $key => $value)
      {
        //echo "key ".$key." ".$totalsum1[$key][0]." ".$totalsum1[$key][1].' '.round($totalsum1[$key][0]/$totalsum1[$key][1])."<BR>";
        $modport+=round($totalsum1[$key][0]/$totalsum1[$key][1]);

      }
      //	echo "modport ".$modport;
      //array_push($retstring,$col1[0].','.$modport.','.$modelPortfolio[$modport]);
      array_push($retstring,$col1[0].','.$modport.','.$modelPortfolio[$modport]);
    }
    return $retstring;
  }
}

 function calculate() {

		}