<?php

class Token
{
    private $_token;

    public function __construct()
    {

    }

    protected function generateToken()
    {
        $characters = 'qwertyuiopasdfghjklzxcvbnm0123456789';

        $randomString = '';

        for ($i = 0; $i < $n; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }

        // $this->_token = $randomString;

        return $randomString;
    }

    /**
     * Get the value of _token
     */
    public function get_token()
    {
        // if (is_null($this->_token))

        return $this->generateToken();
    }

    /**
     * Set the value of _token
     *
     * @return  self
     */
    public function set_token($_token)
    {
        $this->_token = $_token;

        return $this;
    }
}
