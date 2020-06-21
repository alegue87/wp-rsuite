import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Home() {
  return <div>
  	<Link to='/product/abc'> Prodotto abc</Link>
  	<Link to='/product/cde'> Prodotto cde</Link>
  	<Link to='/category/1'>Categoria 1</Link>
  </div>
}