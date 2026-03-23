import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WhyBubuloMarquee from './components/WhyBubuloMarquee.jsx';
import '../styles.css';
import './index.css';

const el = document.getElementById('why-bubulo-marquee-root');
if (el) {
  createRoot(el).render(
    <StrictMode>
      <WhyBubuloMarquee />
    </StrictMode>
  );
}
