<?php

namespace App\Controllers\Api;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Shield\Entities\User;
// 
// $session = \Config\Services::session();
// $session = session();\
// $this->load->library('session');


class AuthController extends ResourceController
{
    // protected $my_session;

    // public function __construct()
    // {
    //     $this->my_session = session();
    // }
    //post
    public function register() {
        $rules = [
            "username" => "required",
            "email" => "required|valid_email|is_unique[auth_identities.secret]",
            "password" => "required",
        ];
    
        if (!$this->validate($rules)) {
            $response = [
                "status" => false,
                "message" => $this->validator->getErrors(),
                "data" => []
            ];
        } else {
            //user model
            $userObject = new UserModel();
            //user entity
            $userEntityObject = new User([
                "username" => $this->request->getVar("username"),
                "email" => $this->request->getVar("email"),
                "password" => $this->request->getVar("password") // Fixed "this" to "$this"
            ]);
    
            $userObject->save($userEntityObject);
    
            $response = [
                "status" => true,
                "message" => "user saved successfully",
                "data" => []
            ]; // Added semicolon here
    
            // Data set
    
        }
    
        return $this->respondCreated($response);
        //create users
        //Data: username, email, password
        //Validation
        //Model
        //Save data to database table
    }
    

    //post
    public function login()
    {

        if(auth()->loggedIn()){
            auth()->logout();
        }

        $rules = [
            "email" => "required|valid_email",
            "password" => "required"
        ];

        if (!$this->validate($rules)) {

            $response = [
                "status" => false,
                "message" => $this->validator->getErrors(),
                "data" => []
            ];
        } else {

            // success
            $credentials = [
                "email" => $this->request->getVar("email"),
                "password" => $this->request->getVar("password")
            ];

            $loginAttempt = auth()->attempt($credentials);

            if (!$loginAttempt->isOK()) {
                $response = [
                    "status" => false,
                    "message" => "Invalid login details",
                    "data" => []
                ];
            } else {

                $userObject = new UserModel();

                $userData = $userObject->findById(auth()->id());

                $token = $userData->generateAccessToken("thisismysecretkey");

                $auth_token = $token->raw_token;

                $response = [
                    "status" => true,
                    "message" => "User logged in successfully",
                    "data" => [
                        // "session" => $session->get($credentials),
                        "token" => $auth_token
                    ]
                ];
            }
        }

        return $this->respondCreated($response);
    }

    // public function setUserMethod($user){
    //     $data = [
    //         'id' => $user['id'],
    //         'username' => $user['username'],
    //         'email' => $user['email'],
    //         'isLoggedIn' => true,
    //     ];

    //     session()->set($data);
    //     return true;
    // }
    
    
    

    //get
    public function profile()
    {
        $userId = auth()->id();

        $userObject = new UserModel();

        $userData = $userObject->findById($userId);

        return $this->respondCreated([
            "status" => true,
            "message" => "Profile information of logged in user",
            "data" => [
                "user" => $userData
            ]
        ]);
    }

    public function userSession(){


    }

    //get
    public function logout(){
        auth()->logout();

        auth()->user()->revokeAllAccessTokens();
        //use logout
        //destroy token
        return $this->respondCreated([
            "status" => true,
            "message" => "user logged out successfully",
            "data" => [],
        ]);
    }

    public function accessDenied(){
        return $this->respondCreated([
            "status" => false,
            "message" => "Invalid access",
            "data" => []
        ]);
    }
}
