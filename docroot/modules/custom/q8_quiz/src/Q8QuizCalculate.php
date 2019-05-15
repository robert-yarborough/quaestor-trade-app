<?php

namespace Drupal\q8_quiz;

use Drupal\q8_quiz\Step\StepQuestion;

/**
 * Class Q8QuizCalculate.
 */
class Q8QuizCalculate {

  /**
   * Constructs a new Q8QuizCalculate object.
   */
  public function __construct() {

  }


  public function getQuestionCsvDataBySteps(array $steps) {
    if (isset($steps) && !empty($steps)) {
      $values = [];

      $question_number = 1;
      foreach ($steps as $step) {
        if ($step instanceof StepQuestion) {
          $step_values = $step->getValues();

          if(isset($step_values)) {
            foreach ($step_values as $value) {
              $value['question_number'] = $question_number;

              $values[] = $value;
            }

            $question_number++;
          }
        }
      }
      ksm($values);
    }
  }

  /**
   * Returns an List variable contain code and name of model portfolio.
   *
   * First argument must be file name of question set.
   *
   * If validation fail then display error message and return empty.
   */
  public function calculateQuizResult(string $fquestions, string $fanswers, string $fsecond = '') {
    $modelPortfolio = $retstring = $answers = [];

    $modelPortfolio[1] = "CONSERVATIVE";
    $modelPortfolio[2] = "MODERATELY CONSERVATIVE";
    $modelPortfolio[3] = "MODERATE";
    $modelPortfolio[4] = "BALANCED";
    $modelPortfolio[5] = "MODERATE GROWTH";
    $modelPortfolio[6] = "MODERATELY AGGRESSIVE";
    $modelPortfolio[7] = "AGGRESSIVE";

    if ((!is_file($fquestions)) && (!file_exists($fquestions))) {
      \Drupal::service('logger.factory')
        ->get('q8_quiz')
        ->critical('Question @fquestions File Dose not exist @fquestions.', ['@fquestions' => $fquestions]);
      return;
    }
    $questions = file($fquestions, FILE_IGNORE_NEW_LINES);

    for ($i = 0; $i < count($questions); $i++) {
      if (count(explode(',', $questions[$i])) < 4) {
        \Drupal::service('logger.factory')
          ->get('q8_quiz')
          ->critical('Wrong question format @questions used four separators  ,,,,', ['@questions' => $questions[$i]]);
        return;
      }

      if ($i >= 1) {
        $que = explode(',', $questions[$i]);
        for ($j = 0; $j < 4; $j++) {
          if (!ctype_digit($que[$j])) {
            \Drupal::service('logger.factory')
              ->get('q8_quiz')
              ->critical('Wrong question format @questions. Use integer values', ['@questions' => $questions[$i]]);
            return;
          }
        }
      }
    }

    if (count(explode(',', $fanswers)) > 6) {
      array_push($answers, "");
      array_push($answers, $fanswers);

      if (count(explode(',', $fsecond)) > 4) {
        $answers[1] = $answers[1] . ',' . $fsecond;
      }
    }
    else {
      if ((!is_file($fanswers))&&(!file_exists($fanswers))) {
        \Drupal::service('logger.factory')
          ->get('q8_quiz')
          ->critical('Answers set I @fanswers. File Dose not exist', ['@fanswers' => $fanswers]);
        return;
      }

      $answers = file($fanswers, FILE_IGNORE_NEW_LINES);
      if (!empty($fsecond)) {
        if ((!is_file($fsecond))&&(!file_exists($fsecond))) {
          \Drupal::service('logger.factory')
            ->get('q8_quiz')
            ->critical('Answers set II @fsecond. File Dose not exist', ['@fsecond' => $fsecond]);
          return;
        }

        $secanswers = file($fsecond, FILE_IGNORE_NEW_LINES);
        unset($secanswers[0]);
        $cnt = 1;
        foreach ($secanswers as $value) {
          $sec = explode(',', $value);
          unset($sec[0]);
          $answers[$cnt] = $answers[$cnt] . ',' . implode(',', $sec);
          $cnt++;
        }
      }
    }

    for ($i = 1; $i < count($answers); $i++) {
      $ans = explode(',', $answers[$i]);
      if (count($ans) < 5) {
        \Drupal::service('logger.factory')
          ->get('q8_quiz')
          ->critical('Wrong answer format @answer. Count @count. used four separators  ,,,,. Sample: Serial2 2,1,5,4,4,2,1,5,4,4,5,1,2,3,4,5,1,2', [
            '@answer' => $answers[$i],
            '@count' => count($ans),
          ]);
        return;
      }

      if (count($ans) > count($questions)) {
        \Drupal::service('logger.factory')
          ->get('q8_quiz')
          ->critical('Number of answers [@count_answer] is more than number of questions @count_question. Answer is @answer.', [
            '@count_answer' => count($ans),
            '@count_question' => count($questions),
            '@answer' => $answers[$i],
          ]);
        return;
      }

      for ($j = 1; $j < count($ans); $j++) {
        $que = explode(',', $questions[$j]);
        if ($ans[$j] > $que[3]) {
          \Drupal::service('logger.factory')
            ->get('q8_quiz')
            ->critical('Answer [@answer_iteration] is more than total number of answers [@question]. Answer is @answer', [
              '@answer_iteration' => count($ans),
              '@question' => count($questions),
              '@answer' => $answers[$i],
            ]);
          return;
        }
      }
    }

    for ($k = 1; $k < count($answers); $k++) {
      $totalsum1 = [];

      $qn = 1;
      $col1 = explode(',', $answers[$k]);

      for ($i = 1; $i < count($col1); $i++) {

        $que = explode(',', $questions[$qn]);
        $tmp2 = $que[2] * $col1[$i] * $que[0] / $que[3];
        $tmp3 = $que[2];
        if (array_key_exists($que[0], $totalsum1)) {
          $tmp1 = $totalsum1[$que[0]];
          $totalsum1[$que[0]] = [$tmp1[0] + $tmp2, $tmp1[1] + $tmp3];
        }
        else {
          $totalsum1[$que[0]] = [$tmp2, $tmp3];
        }

        $qn++;
      }

      $modport = -1;
      foreach ($totalsum1 as $key => $value) {
        $modport += round($totalsum1[$key][0] / $totalsum1[$key][1]);
      }

      $var = $col1[0] . ',' . $modport;
      if (!empty($fsecond)) {
        $var .= ',' . $modelPortfolio[$modport];
      }
      array_push($retstring, $var);
    }

    return $retstring;
  }

}
