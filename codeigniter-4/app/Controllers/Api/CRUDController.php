<?php

namespace App\Controllers\Api;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UsersModel;
use App\Models\AuthIdentitiesModel;
use CodeIgniter\Shield\Entities\User;
// use CodeIgniter\Shield\Entities\User;

// defined('BASEPATH') OR exit('No direct script access allowed');
// $db = \Config\Database::connect();


class CRUDController extends ResourceController
{
    public function addUser()
    {
        // Get the User Provider (UserModel by default)
        $users = auth()->getProvider();

        $user = new User([
            'username' => $this->request->getVar("username"),
            'email'    => $this->request->getVar("email"),
            'password' => $this->request->getVar("password"),
        ]);
        $users->save($user);

        // To get the complete user object with ID, we need to get from the database
        $user = $users->findById($users->getInsertID());

        // Add to default group
        $users->addToDefaultGroup($user);
    }

    public function getUsers(){
        $usersObject = new UsersModel();
        $authIdentitiesObject = new AuthIdentitiesModel();

        $data = $usersObject->select(["id", "username", "created_at"])->find();
        $data1 = $authIdentitiesObject->select(["secret", "user_id"])->whereIn("type", ["email_password"])->findAll();

        // $data1 = $authIdentitiesObject->find();

        $joinedData = [];

        foreach ($data1 as &$row1) {
            foreach ($data as $row) {
                if ($row['id'] == $row1['user_id']) {
                    $row1['username'] = $row['username'];
                    $row1['created_at'] = $row['created_at'];
                    $joinedData[] = $row1;
                }
            }
        }


        $response = [
            "status" => true,
            "message" => "data",
            "data" => $joinedData
        ];

        return $this->respondCreated($response);
    }

    public function deleteUser($id){
        // $idToDelete = $id;
        // $usersObject = new UsersModel();
        // $authIdentitiesObject = new AuthIdentitiesModel();

        // $data = $usersObject->select(["id", "username"])->find();
        // $data1 = $authIdentitiesObject->select(["secret", "user_id"])->whereIn("type", ["email_password"])->findAll();

        // $data1 = $authIdentitiesObject->find();

        // $usersObject->delete(['user_id' => $idToDelete]);
        // $authIdentitiesObject->delete(['id' => $idToDelete]);


        // $response = [
        //     "status" => true,
        //     "message" => "success",
        // ];
        // return $this->respondCreated($response);
        $user = new User();
        $users = auth()->getProvider();

        $users->delete(['user_id' => $id], true);

        $response = [
            "status" => true,
            "message" => "Data deleted successfully",
        ];

    }

    public function editUser(int $id){
        $usersObject = new UsersModel();
        $user = new User();
        $users = auth()->getProvider();

        $user = $users->findById($id);

        // Check if the user exists in the UsersModel
        $userExists = $usersObject->where('id', $id)->first();

        if ($userExists) {

            $user->fill([
                'username' => $this->request->getVar("username"),
                'email' => $this->request->getVar("email"),
                // 'password' => $this->request->getVar("password")
            ]);

            if($this->request->getVar("password")!=null){
                $user["password"] = $this->request->getVar("password");
            }
            $users->save($user);

            $response = [
                "status" => true,
                "message" => "success",
                "data" => [$user]
            ];
            return $this->respondCreated($response);

        } else {
            $response = [
                "status" => false,
                "message" => "user doesnt exist",
                "data" => []
            ];
            return $this->respondCreated($response);
        }
}


}
