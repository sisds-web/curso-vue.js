<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills()
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id)
{
    $bills = getBills();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills', function () use ($app) {
    $bills = getBills();
    return $app->json($bills);
});

$app->get('api/bills/total', function () use ($app) {
    $bills = getBills();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/{id}', function ($id) use ($app) {
    $bills = getBills();
    $bill = $bills[findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills', function (Request $request) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $index = findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{id}', function ($id) {
    $bills = getBills();
    $index = findIndexById($id);
    array_splice($bills,$index,1);
    writeBills($bills);
    return new Response("", 204);
});



function getReceives()
{
    $json = file_get_contents(__DIR__ . '/receives.json');
    $data = json_decode($json, true);
    return $data['receives'];
}

function findIndexByIdReceive($id)
{
    $receives = getReceives();
    foreach ($receives as $key => $receive) {
        if ($receive['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeReceives($receives)
{
    $data = ['receives' => $receives];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/receives.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});


$app->get('api/receives', function () use ($app) {
    $receives = getReceives();
    return $app->json($receives);
});

$app->get('api/receives/total', function () use ($app) {
    $receives = getReceives();
    $sum=0;
    foreach ($receives as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});


$app->get('api/receives/{id}', function ($id) use ($app) {
    $receives = getReceives();
    $receive = $receives[findIndexByIdReceive($id)];
    return $app->json($receive);
});

$app->post('api/receives', function (Request $request) use ($app) {
    $receives = getReceives();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $receives[] = $data;
    writeReceives($receives);
    return $app->json($data);
});

$app->put('api/receives/{id}', function (Request $request, $id) use ($app) {
    $receives = getReceives();
    $data = $request->request->all();
    $index = findIndexByIdReceive($id);
    $receives[$index] = $data;
    $receives[$index]['id'] = (int)$id;
    writeReceives($receives);
    return $app->json($receives[$index]);
});

$app->delete('api/receives/{id}', function ($id) {
    $receives = getReceives();
    $index = findIndexByIdReceive($id);
    array_splice($receives,$index,1);
    writeReceives($receives);
    return new Response("", 204);
});



$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();