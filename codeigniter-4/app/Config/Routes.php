<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
use CodeIgniter\Router\RouteCollection;

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit();
}
/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

service('auth')->routes($routes);

$routes->group("api", ["namespace" => "App\Controllers\Api"], function ($routes) {
    $routes->get("invalid-access", "AuthController::accessDenied");
    //post
    $routes->post("register", "AuthController::register");

    //post
    $routes->post("login", "AuthController::login");

    $routes->get("logout", "AuthController::logout", ["filter" => "apiauth"]);

    $routes->post("add-user", "CRUDController::addUser", ["filter" => "apiauth"]);
    
    $routes->delete("delete-user/(:num)", "CRUDController::deleteUser/$1", ["filter" => "apiauth"]);

    $routes->patch("edit-user/(:num)", "CRUDController::editUser/$1", ["filter" => "apiauth"]);

    $routes->get("get-users", "CRUDController::getUsers", ["filter" => "apiauth"]);

    //get

    // $routes->post("add-project", "ProjectController::addProject", ["filter" => "apiauth"]);

    // $routes->get("list-projects", "ProjectController::listProjects");

    // $routes->delete("delete-project/(:num)", "ProjectController::deleteProject/$1");
    

});
