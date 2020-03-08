import React from 'react'

/** Navigation bar component
 * consists of App title and search bar
 */
const NavigationBar = (props) => {
  return (
    <div className="row">
      <section className="col s10">
        <nav>
          <div className="nav-wrapper">
            <a href="/#" className="brand-logo">MovieDB</a>
          </div>
        </nav>
      </section>

      <section className="col s2">
        <form action="" onSubmit={props.handleSubmit}>
          <div className="input-field">
            <input placeholder="Search movie" type="text" onChange={props.handleChange}/>
          </div>
        </form>
      </section>
    </div>
  )
};

export default NavigationBar;
