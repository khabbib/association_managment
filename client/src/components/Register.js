import React from 'react'
import './Register.css'
const Register = ()=>{

  return(
    <div class="container">
    <div class="row d-flex justify-content-center mt-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card py-3 px-2">
                <p class="text-center mb-3 mt-2">SE CONNECTER AVEC</p>
                <div class="row mx-auto ">
                    <div class="col-4"> <i class="fab fa-twitter"></i> </div>
                    <div class="col-4"> <i class="fab fa-facebook"></i> </div>
                    <div class="col-4"> <i class="fab fa-google"></i> </div>
                </div>
                <div class="division">
                    <div class="row">
                        <div class="col-3">
                            <div class="line l"></div>
                        </div>
                        <div class="col-6"><span>OU AVEC MON EMAIL</span></div>
                        <div class="col-3">
                            <div class="line r"></div>
                        </div>
                    </div>
                </div>
                <form class="myform">
                    <div class="form-group"> <input type="email" class="form-control" placeholder="Email" /> </div>
                    <div class="form-group"> <input type="password" class="form-control" placeholder="Mot de passe" /> </div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="form-group form-check"> <input type="checkbox" class="form-check-input" id="exampleCheck1" /> <label class="form-check-label" for="exampleCheck1">Rester connecte</label> </div>
                        </div>
                        <div class="col-md-6 col-12 bn">Mot se passe oublie</div>
                    </div>
                    <div class="form-group mt-3"> <button type="button" class="btn btn-block btn-primary btn-lg"><small><i class="far fa-user pr-2"></i>Se connecter</small></button> </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )


}


export default Register;