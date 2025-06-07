import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Sistema de Farmacia
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={styles.navLink}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/medicamentos" className={styles.navLink}>
              Medicamentos
            </Link>
          </li>
          <li>
            <Link href="/ordenes-venta" className={styles.navLink}>
              Órdenes de Venta
            </Link>
          </li>
          <li>
            <Link href="/detalles-venta" className={styles.navLink}>
              Detalles de Venta
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
