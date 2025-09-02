import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>О Imperial Silk</h1>
          <p>Традиции китайского мастерства в современном исполнении</p>
        </div>
        
        <div className="about-content">
          <section className="about-story">
            <div className="story-text">
              <h2>Наша история</h2>
              <p>Imperial Silk основан на многовековых традициях китайского шелкового производства. Наша компания родилась из страсти к сохранению и развитию уникальных техник, которые веками совершенствовались китайскими мастерами.</p>
              <p>Мы объединяем ancient techniques с современным дизайном, создавая одежду, которая отражает богатое культурное наследие Китая и соответствует актуальным трендам мировой моды.</p>
            </div>
            <div className="story-image">
              <img src="https://logichina.ru/wp-content/uploads/2025/04/gl2.png" alt="Традиционное китайское производство" />
            </div>
          </section>
          
          <section className="about-values">
            <h2>Наши ценности</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎨</div>
                <h3>Искусство и культура</h3>
                <p>Мы черпаем вдохновение в богатом культурном наследии Китая, преобразуя traditional motifs в современные designs.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">👑</div>
                <h3>Качество и роскошь</h3>
                <p>Мы используем только premium materials и уделяем внимание каждой детали, чтобы создать по-настоящему luxurious products.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🌱</div>
                <h3>Устойчивое развитие</h3>
                <p>Мы заботимся об окружающей среде и используем sustainable practices в нашем производственном процессе.</p>
              </div>
            </div>
          </section>
          
          <section className="about-process">
            <h2>Наш процесс</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Дизайн</h3>
                <p>Наши дизайнеры создают эскизы, вдохновленные traditional Chinese art и современными трендами.</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Выбор материалов</h3>
                <p>Мы тщательно отбираем только самый качественный шелк и материалы для создания наших изделий.</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Производство</h3>
                <p>Опытные мастера используют traditional techniques для создания каждого изделия с особым вниманием к деталям.</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Контроль качества</h3>
                <p>Каждое изделие проходит тщательную проверку перед тем, как отправиться к нашему клиенту.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;