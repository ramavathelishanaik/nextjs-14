import Navbar from '../_components/navbar';
import Header from '../_components/header';

export default function PagesLayout({ children }) {
  return (
    <section>
      <Header />
      <Navbar />
      {children}
    </section>
  );
}
