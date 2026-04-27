import { YandexMap } from "@/components/media/yandex-map";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/data/site-content";

type BookingSectionProps = {
  content: SiteContent["contacts"];
};

export function BookingSection({ content }: BookingSectionProps) {
  return (
    <Reveal as="section" className="site-section" ariaLabel="Запись" >
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="booking-grid glass-card" id="booking">
          <div className="booking-copy">
            <div className="contact-list">
              <div className="contact-item">
                <strong>Телефон</strong>
                <span>{content.phone}</span>
              </div>
              <div className="contact-item">
                <strong>Адрес</strong>
                <span>{content.address}</span>
              </div>
              <div className="contact-item">
                <strong>Время работы</strong>
                <span>{content.hours}</span>
              </div>
            </div>

            <a className="button-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
              {content.primaryCta.label}
            </a>

            <YandexMap />
          </div>

          <form className="booking-form">
            {content.formFields.map((field) => (
              <div className="form-field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input id={field.name} name={field.name} placeholder={field.placeholder} />
              </div>
            ))}

            <a className="button-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
              {content.primaryCta.label}
            </a>
          </form>
        </div>
      </Container>
    </Reveal>
  );
}

