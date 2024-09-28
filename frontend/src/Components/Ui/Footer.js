import React from 'react';


export default function Footer() {
  return (
    <footer
      className="w-100 text-center text-white"
      style={{ padding: '20px', backgroundColor:"#141E46" }}
    >
      <div className="container">
        <section className="mb-4">
          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            href='#!'
            className="btn btn-outline-light btn-floating m-1"
            role='button'
            style={{ fontSize: '24px' }}
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2024 Copyright:
        <a
          className="text-white"
          href='https://mdbootstrap.com/'
          style={{ textDecoration: 'none' }}
        >
          JobQuest.com
        </a>
      </div>
    </footer>
  );
}
