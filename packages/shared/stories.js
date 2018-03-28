import React from 'react'
import { createStoriesFactory } from './story'

// Load first paragraph from README file
const readme = ''

// Create factories for story
const addStory = createStoriesFactory('Typography and basics', module)

// Stories

addStory('Headers', readme, () => (
  <div>
    <h1>h1. Header</h1>
    <h2>h2. Header</h2>
    <h3>h3. Header</h3>
    <h4>h4. Header</h4>
    <h5>h5. Header</h5>
    <h6>h6. Header</h6>

    <h1>h1. Header <small>Secondary text</small></h1>
    <h2>h2. Header <small>Secondary text</small></h2>
    <h3>h3. Header <small>Secondary text</small></h3>
    <h4>h4. Header <small>Secondary text</small></h4>
    <h5>h5. Header <small>Secondary text</small></h5>
    <h6>h6. Header <small>Secondary text</small></h6>
  </div>
))

addStory('Text styling', readme, () => (
  <div>
    <h2>Paragraphs</h2>

    <p>
      Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.
      Maecenas malesuada elit lectus felis, malesuada ultricies.
      Curabitur et ligula. Ut molestie a, ultricies porta urna.
      Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor.
    </p>

    <p>
      Pellentesque facilisis. Nulla imperdiet sit amet magna.
      Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.
    </p>

    <p>
      Aliquam erat ac ipsum. Integer aliquam purus.
      Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis
      faucibus orci luctus non, consectetuer lobortis quis, varius in, purus.
      Integer ultrices posuere cubilia Curae, Nulla ipsum dolor lacus, suscipit adipiscing.
      Cum sociis natoque penatibus et ultrices volutpat.
    </p>

    <h2>Inline styling</h2>

    <p>
      We may have some <strong>strong elements</strong> inside our text, as well as some <em>emphasises</em>.
      When we want to calculate 2<sup>3</sup> + x<sub>1</sub>, we may have problems, but it's easy to show it.
      <br />
      In some circumstances, mostly describing our API or other stuff we may also try to show some <code>short code snippet</code>.
      It happens that we may also use <kbd>Ctrl+C</kbd> to hint user with keyboard shortcuts.
    </p>

    <p>
      It may happen that we would like to <mark>highlight</mark> some content inside our dashboards, in case of some search engine.
    </p>

    <p>
      <del>We do not make any mistakes.</del> When we do, we can write it semantically marking that anyway.
    </p>

    <p>
      When we use some shortcuts like <abbr title='Looks good to me'>LGTM</abbr>, we can show such information for user.
    </p>

    <h2>Quotes and testimonials</h2>

    <blockquote>
      This was one of the best experiences I have ever had with a cab company.
      I had problems at the airport and the driver stayed with me for over an hour and helped me sort everything out.
      I would recommend this company to anyone. Thank you for such fabulous service!
    </blockquote>

    <blockquote>
      This was one of the best experiences I have ever had with a cab company.
      I had problems at the airport and the driver stayed with me for over an hour and helped me sort everything out.
      I would recommend this company to anyone. Thank you for such fabulous service!

      <footer>
        <cite>R.M.</cite>
      </footer>
    </blockquote>
  </div>
))

addStory('RTL: Headers', readme, () => (
  <div dir='rtl'>
    <h1>h1. כּוֹתֶרֶת</h1>
    <h2>h2. כּוֹתֶרֶת</h2>
    <h3>h3. כּוֹתֶרֶת</h3>
    <h4>h4. כּוֹתֶרֶת</h4>
    <h5>h5. כּוֹתֶרֶת</h5>
    <h6>h6. כּוֹתֶרֶת</h6>

    <h1>h1. כּוֹתֶרֶת <small>טקסט משני</small></h1>
    <h2>h2. כּוֹתֶרֶת <small>טקסט משני</small></h2>
    <h3>h3. כּוֹתֶרֶת <small>טקסט משני</small></h3>
    <h4>h4. כּוֹתֶרֶת <small>טקסט משני</small></h4>
    <h5>h5. כּוֹתֶרֶת <small>טקסט משני</small></h5>
    <h6>h6. כּוֹתֶרֶת <small>טקסט משני</small></h6>
  </div>
))

addStory('RTL: Text styling', readme, () => (
  <div dir='rtl'>
    <h2>פסקאות</h2>

    <p>
      אחד אל בדפים חרטומים, או פיסול צרפתית ויקיפדיה היא, אם מדריכים הגולשות כתב. ב עוד המחשב ברוכים עקרונות. ספינות מדריכים אקטואליה אחר על.
      זאת אם ביולוגיה אדריכלות, עוד ראשי וקשקש מתמטיקה ב. ויש בה רביעי תרומה לציין. זקוק המדינה גם עוד.
      זאת דת לתרום הבאים נוסחאות, אם פיסיקה סטטיסטיקה אווירונאוטיקה רבה.
    </p>

    <p>
      נפלו למנוע מונחונים או כדי. אחרות תקשורת בה אחר. מיזם יסוד רביעי בה מלא, הבקשה בדפים על זכר. כלל או העזרה ממונרכיה, כלל גם הטבע אנציקלופדיה, אנא אל שמות יסוד.
    </p>

    <p>
תיקונים והגולשים אל בדף, של בדף בישול יוצרים העברית. עזה אם והוא הארץ בידור, תחבורה משופרות עזה אם.
      מה רוסית בארגז הגולשות צ'ט, קבלו מוסיקה ב אחד, מדעי אדריכלות בדף בה. מדע שתפו ויקימדיה אם.
      אדריכלות אווירונאוטיקה אתה של, תרבות ולחבר צ'ט דת.
      לחשבון לויקיפדיה עזה אל, תנך דרכה בכפוף מיוחדים של.
      שתי מה רפואה אודות, כיצד רקטות סטטיסטיקה דת שמו. עוד אקראי וקשקש מיוחדים אם,
      לוח גם העזרה בהתייחסות. מה מונחים אספרנטו קרן. אינו לעריכה של חפש, בה מאמר מוגש אנא.
      בקר הרוח מתמטיקה את, בה החלה יסוד הגולשות קרן. בה לימודים ממונרכיה ואלקטרוניקה עזה,
      חופשית מועמדים מדע של. מדע עזרה אחרות המלצת של, דת יוני אנגלית כתב.
    </p>

    <h2>עיצוב מוטבע</h2>

    <p>
      אולי יש לנו<strong> כמה אלמנטים חזקים בתוך הטקסט </strong>שלנו, כמו גם כמה מדגיש.
      ב במקרים מסוימים, בעיקר לתאר את ה- API שלנו או דברים אחרים אנו עשויים<code> גם לנסות להציג קטע קוד קצר. זה קורה</code>כי אנו יכולים גם >להשתמ
      <kbd>Ctrl+C</kbd> לרמז למשתמש עם קיצורי מקשים.
    </p>

    <p>
      זה יכול לקרות כי אנחנו רוצים להדגיש קצת תוכן בתוך לוחות.<mark> המחוונים שלנו, במקרה של מנוע </mark>החיפוש
    </p>

    <p>
      <del>אנחנו לא עושים שום טעויו</del>ת. כאשר אנו עושים, אנחנו יכולים לכתוב את זה סמנטית סימון כי בכל מקרה.
    </p>

    <p>
      כאשר אנו משתמשים בקיצורי דרך מסוימים כמו <abbr title='נראה לי טוב'>LGTM</abbr>, אנו יכולים להציג מידע כזה עבור המשתמש.
    </p>

    <h2>ציטוטים ועדויות</h2>

    <blockquote>
      זה היה אחד החוויות הטובות ביותר שהיו לי אי פעם עם חברת מוניות.
היו לי בעיות בשדה התעופה והנהג נשאר איתי יותר משעה ועזר לי למיין הכול.
אני ממליץ על חברה זו לכל אחד. תודה לך על שירות נהדר
    </blockquote>

    <blockquote>
      זה היה אחד החוויות הטובות ביותר שהיו לי אי פעם עם חברת מוניות.
היו לי בעיות בשדה התעופה והנהג נשאר איתי יותר משעה ועזר לי למיין הכול.
אני ממליץ על חברה זו לכל אחד. תודה לך על שירות נהדר
      <footer>
        <cite>מה-שמו</cite>
      </footer>
    </blockquote>

    <div style={{ display: 'flex' }}>
      <blockquote style={{ marginLeft: '15px' }}>
        זה היה אחד החוויות הטובות ביותר שהיו לי אי פעם עם חברת מוניות.
  היו לי בעיות בשדה התעופה והנהג נשאר איתי יותר משעה ועזר לי למיין הכול.
  אני ממליץ על חברה זו לכל אחד. תודה לך על שירות נהדר
        <footer>
          <cite>מה-שמו</cite>
        </footer>
      </blockquote>

      <blockquote>
        זה היה אחד החוויות הטובות ביותר שהיו לי אי פעם עם חברת מוניות.
  היו לי בעיות בשדה התעופה והנהג נשאר איתי יותר משעה ועזר לי למיין הכול.
  אני ממליץ על חברה זו לכל אחד. תודה לך על שירות נהדר
        <footer>
          <cite>מה-שמו</cite>
        </footer>
      </blockquote>
    </div>
  </div>
))
