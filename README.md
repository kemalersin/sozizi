# sozizi

**Goodreads**'e sık sık alıntı ekliyorum. Ama sitenin alıntı girme kısmını pek beğendiğim söylenemez; sıkış tıkış, kısıtlayıcı bir tasarımı var bu kısmın.
Bunun üzerine ben de oturdum, kendi alıntı paylaşma uygulamamı geliştirdim: http://sozizi.herokuapp.com

Uygulama sadece Goodreads'e alıntı eklemeye yarıyor. Tabii böyle geniş geniş, ferah bir şekilde. Uygulamanın varoluş amacı bu zaten.

Sozizi'nin bazı kilit özellikleri:

* Single page olduğu için sayfa yükleme yok.
* Goodreads'in aksine alıntılar kitap bazlı giriliyor.
* Alıntı ekleme kısmı, son seçtiğiniz kitabı hatırlıyor.
* Girilen alıntıyı paylaşmak için Goodreads'e ihtiyaç yok.

Eksikleri ve hataları çok. Bir kısmının farkındayım ve bunları zaman içinde gidereceğim.
Şunu da eklemek lazım: Bu bir **Angular Full-Stack** uygulaması. **MEAN** ile geliştirildi. **AngularJS** bilgim çok az olduğundan, uygulamayı geliştirirken belirli bazı konularda biraz uğraşmak zorunda kaldım. Bu yüzden, basit görünse de uygulamayı geliştirmek, sadece kodlama süresini baz alırsak yaklaşık bir haftamı aldı.

Ancak şunu çok rahat söyleyebilirim ki AngularJS, tartışmaya açık bir takım konuları göz ardı edersek front-end'te hayat kurtaran bir framework. Açıkçası, meslek yaşamımım son yılları için konuşmamız gerekirse, **JQuery** ve **Ext JS** ile harcadığım zaman için üzülüyorum; Angular Full-Stack çatısını kullanarak öğrendiğim ve deneyimlediğim şeyler, ve Angular'ın bunları nasıl kolay bir hale getirdiğini görmek bir yazılımcı olarak ufkumu fezaya taşıdı.

Sisteminizde **Node.js**, **Yeoman** ve **Gulp** yüklüyse ve çalışan bir **MongoDB** servisiniz varsa, projeyi klonladıktan sonra uygulamayı başlatmak için `node install` ve `gulp serve` komutlarını vermeniz yeterli.

**Not:** Sozizi, **Heroku**'da ücretsiz dyno üzerinde çalıştığı için, belirli bir süre erişim olmazsa uygulama Heroku tarafından bekleme durumuna geçiriliyor. Bu nedenle zaman zaman siteye ilk erişim yavaş olabilir.

---

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.0.4.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
