import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Panel } from 'rsuite';

export default function Home() {

  return(
    <Panel bordered header='home'><ul>
      <li><Link to='/product/abc'> Prodotto abc</Link></li>
      <li><Link to='/product/cde'> Prodotto cde</Link></li>
      <li><Link to='/category/1'>Categoria 1</Link></li>
      <li><Link to='/categories'>Categorie</Link></li>
    </ul>
    </Panel>
  )
}