import React from 'react';

const Home = () => {
  return (
    <section>
      <h1>Bienvenido al Club 'La Cantera Padel'</h1>
      <p>Los mejores artículos deportivos.</p>
      <img
        src="/assets/banner.jpg"
        alt="Banner"
        style={{ width: '100%', height: '300px', borderRadius: '12px', marginTop: '20px' }}
      />
    </section>
  );
};

export default Home;