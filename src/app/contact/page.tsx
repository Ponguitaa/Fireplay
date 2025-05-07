import React from 'react';
import ContactForm from '@/components/contact-form';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <p>Do you have any questions or feedback? Feel free to contact us!</p>
      <ContactForm />
    </div>
  );
}