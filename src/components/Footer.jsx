import React from 'react'

export const Footer = () => {
    return (
        <div className='container-fluid bg-black m-auto mb-2 rounded-bottom-2'>
            <h4 className='text-center text-light p-3'>
                FutStore CR <i class="bi bi-shop m-2"></i>
            </h4>
            <div className='container-fluid row md-5 text-success'>
                <div className=' col-4 text-center'>
                    <h4>Contact <i class="bi bi-person-rolodex m-2"></i> </h4>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-envelope m-2"></i>
                        futstorecr@gmail.com
                    </div>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-whatsapp m-2"></i>
                        (506) 87655-2656
                    </div>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-telephone m-2"></i>
                        (506) 2653-23ee42
                    </div>
                </div>
                <div className=' col-4 text-center'>
                    <h4>About Us <i class="bi bi-file-person m-2"></i></h4>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-balloon-heart-fill m-2"></i>
                        FutStore
                    </div>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-people-fill m-2"></i>
                        Nosotros
                    </div>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-newspaper m-2"></i>
                        Politica
                    </div>
                </div>
                <div className=' col-4 text-center'>
                    <h4>Social Media <i class="bi bi-globe m-2"></i></h4>
                    <div className=' mb-2' href="#">
                        <i class="bi bi-facebook m-2"></i>
                        Facebook
                    </div>
                    <div className=' mb-2' href="#">
                    <i class="bi bi-instagram m-2"></i>
                        Instagram
                    </div>
                </div>
            </div>
        </div>
    )
}