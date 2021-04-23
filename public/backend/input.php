<?php

class Input {
    static function int($val){
        $val = filter_var($val, FILTER_VALIDATE_INT);
		if ($val === false || empty($val)) {
            exit(array('success'=> 0, 'message' => "Input Fail"));
		}
		return "" . $val;
    }

    static function float($val){
        $val = filter_var($val, FILTER_VALIDATE_FLOAT);
		if ($val === false || empty($val)) {
            exit(array('success'=> 0, 'message' => "Input Fail"));
		}
		return "" . $val;
    }

    static function str($val) {
		if (!is_string($val) || empty($val))
			exit(array('success'=> 0, 'message' => "Input Fail"));
        if (preg_match("/(\w+)/", $val) == 0)
            exit("Regex Fail");
		$val = trim(htmlspecialchars($val));
		return $val;
	}

    static function email($val) {
		$val = filter_var($val, FILTER_VALIDATE_EMAIL);
		if ($val === false || empty($val)) {
			exit(array('success'=> 0, 'message' => "Input Fail"));
		}
		return $val;
	}
}

?>