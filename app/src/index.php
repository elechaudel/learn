<?php

  require '../../vendor/autoload.php';

  // Symfony components

  use Symfony\Component\Finder\Finder; // The Finder class finds files and/or directories

  // templates rendering (views, layouts and partials)

  $loaderViews = new Twig_Loader_Filesystem(__DIR__ . '/templates');
  $loaderLayouts = new Twig_Loader_Filesystem(__DIR__ . '/templates/layouts');
  $loaderPartials = new Twig_Loader_Filesystem(__DIR__ . '/templates/partials');

  $loader = new Twig_Loader_Chain(array($loaderViews, $loaderLayouts, $loaderPartials));

// Twig loader

  $twig = new Twig_Environment($loader, [
    'cache' => false, // __DIR__ . '/cache'
    'debug' => true
  ]);

// Twig extensions

  $twig->addExtension(new Twig_Extension_Debug());

// Json data

  $jsonFinder = new Finder();
  $jsonFinder->files()->in('data')->name('*.json');
  $jsonData = [];

  foreach ($jsonFinder as $file) {
    $variablebJson = file_get_contents($file);
    $decodedJson = json_decode($variablebJson, true);
    array_push($jsonData, $decodedJson);
  }

  // routing

  $page = 'home'; // the default page

  switch ($page) {
    case 'home': // default page is also accessible at /home
      echo $twig->render('index.twig', array("data" => $jsonData));
      break;
  }

 ?>