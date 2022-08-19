/* jshint esversion: 10 */
//above comment is there for esversion 10 features

/**
 * This array stores all the data of the products in an array that can be used by the various functions on techbay. By using the array.map and array.slice method, the data that is stored here will go through the other JS code using the the itemData keyword, replacing the data where the itemData keyword is placed with this data stored in this array. 
 * cart.js also draws its data from here.
 */
 let productsData = [{
    id:'xtfjhtfhdf',
    name:'D6 Smartphone',
    price:'3600',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/cellphone-1.jpg',
    imgPage:'../images/cellphone-1.jpg',
    readMore:'./productPages/D6 Smartphone.html',
    readMorePage:'../productPages/D6 Smartphone.html'
},
{
    id:'srthsrtyhs',
    name:'D4 Laptop',
    price:'4500',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/laptop-1.jpg',
    imgPage:'../images/laptop-1.jpg',
    readMore:'./productPages/D4 Laptop.html',
    readMorePage:'../productPages/D4 Laptop.html'
},
{
    id:'jdtyhdfhdf',
    name:'Laptop Dual',
    price:'5360',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/laptop-4.jpg',
    imgPage:'../images/laptop-4.jpg',
    readMore:'./productPages/Laptop Dual.html',
    readMorePage:'../productPages/Laptop Dual.html'
},
{
    id:'sxyhxdhdxdth',
    name:'Bass Monitor',
    price:'4270',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/monitor-4.png',
    imgPage:'../images/monitor-4.png',
    readMore:'./productPages/Bass Monitor.html',
    readMorePage:'../productPages/Bass Monitor.html'
},
{
    id:'sdzrtyhyfgdj',
    name:'LLB Box',
    price:'4350',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/cellphone-4.jpg',
    imgPage:'../images/cellphone-4.jpg',
    readMore:'./productPages/LLB Box.html',
    readMorePage:'../productPages/LLB Box.html'
},
{
    id:'dnxfyjhfjhfjh',
    name:'FGO Line',
    price:'6340',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/cellphone-2.jpg',
    imgPage:'../images/cellphone-2.jpg',
    readMore:'./productPages/FGO Line.html',
    readMorePage:'../productPages/FGO Line.html'
},
{
    id:'dfthxsthdfxh',
    name:'EL co 3',
    price:'2340',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/monitor-1.png',
    imgPage:'../images/monitor-1.png',
    readMore:'./productPages/EL co 3.html',
    readMorePage:'../productPages/EL co 3.html'
},
{
    id:'dtghxdtghxdth',
    name:'Brand Ui',
    price:'5640',
    desc1:'Lorem ipsum dolor, sit amet consectetur adipisicing.',
    desc2:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores ratione maxime dolore architecto quibusdam iure ipsam, magnam eveniet amet beatae illum culpa sunt saepe? Ut mollitia at iure nisi eum.',
    img:'./images/monitor-3.jpg',
    imgPage:'../images/monitor-3.jpg',
    readMore:'./productPages/Brand Ui.html',
    readMorePage:'../productPages/Brand Ui.html'
}
];