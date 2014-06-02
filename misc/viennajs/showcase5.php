<?php
header("Content-Type: application/javascript");
$randval = rand(10,100);
if ($randval >10 && $randval < 20) {
?>jsonp('{"value":"Mitch"}');<?php
} else if ($randval >20 && $randval < 30) {
?>jsonp('{"value":"Evil"}');<?php
} else if ($randval >30 && $randval < 40) {
?>jsonp('{"value":"Josef"}');<?php
} else if ($randval >40 && $randval < 50) {
?>jsonp('{"value":"Sam"}');<?php
} else if ($randval >50 && $randval < 60) {
?>jsonp('{"value":"Kathrin"}');<?php
} else if ($randval >60 && $randval < 70) {
?>jsonp('{"value":"Mike"}');<?php
} else if ($randval >70 && $randval < 80) {
?>jsonp('{"value":"Sandy"}');<?php
} else if ($randval >80 && $randval < 90) {
?>jsonp('{"value":"Fritz"}');<?php
} else {
?>jsonp('{"value":"Clara"}');<?php
}
?>