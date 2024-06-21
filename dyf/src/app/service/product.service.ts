import { Injectable } from "@angular/core";
import { Product} from "../models/product.model";

@Injectable({
    providedIn: 'root'
})

export class ProductService{ 
    private products: Product[] = [ 
        {
            "precio": 5690,
            "id": 1,
            "categoria":"papas fritas",
            "marca": "McCain",
            "descripcion": "Disfruta de nuestras irresistibles papas fritas con sonrisa, el acompañamiento perfecto que eleva cada comida a otro nivel de satisfacción. Crujientes por fuera y suaves por dentro, nuestras papas fritas están meticulosamente preparadas para asegurar un sabor y textura inigualables. Ya sea que las sirvas como complemento de una hamburguesa jugosa o las disfrutes solas con tu salsa favorita, cada bocado te hará sonreír. Sumérgete en la delicia de estas papas fritas doradas y experimenta cómo transforman cualquier plato en una experiencia gastronómica memorable.",
            "title": "Papa Smile McCain 1,5 kg",
            
            "thumbnailUrl": "../../../assets/images/smile.png"
        },
        {
            "precio": 5990,
            "id": 2,
            "categoria":"papas fritas",
            "marca": "McCain",
            "descripcion": "Descubre nuestras exquisitas papas fritas 12x12, el acompañamiento perfecto para elevar el sabor de tus comidas. Cortadas en un formato cuadrado de 12 por 12 milímetros, estas papas fritas están diseñadas para ofrecer la combinación ideal de crujiente dorado por fuera y suavidad irresistible por dentro. Perfectas para acompañar cualquier platillo, desde hamburguesas gourmet hasta platos principales y ensaladas, nuestras papas fritas 12x12 añaden un toque de calidad y sabor a cada bocado. Experimenta la perfección en cada mordisco y convierte cada comida en una experiencia deliciosa y memorable.",
            "title": "Papas fritas 12x12 onefry  2,5 kg",
            "thumbnailUrl": "../../../assets/images/12x12.png"
        },
        {
            "precio": 6990,
            "id": 3,
            "categoria":"papas fritas",
            "marca": "McCain",
            "descripcion": "Descubre nuestras deliciosas papas fritas 6x6, el acompañamiento perfecto para realzar tus comidas. Cortadas en un tamaño cuadrado de 6 por 6 milímetros, estas papas fritas están diseñadas para ofrecer una combinación excepcional de crujiente en cada bocado y una textura interior suave y sabrosa. Ideales para acompañar una amplia variedad de platos, desde hamburguesas jugosas hasta platos principales gourmet y ensaladas frescas, nuestras papas fritas 6x6 añaden un toque de calidad y sabor a cada comida. Disfruta de la perfección en cada mordisco y transforma tus platos habituales en una experiencia gastronómica memorable.",
            "title": "Papas Fritas Mccain 6x6 mm 2,5kg",
            "thumbnailUrl": "../../../assets/images/6x6.png"
        },
        {
            "precio": 7990,
            "id": 4,
            "categoria":"papas fritas",
            "marca": "McCain",
            "descripcion": "Descubre nuestras deliciosas papas fritas crinkle, el acompañamiento ideal para tus comidas. Con su característico corte ondulado, estas papas fritas no solo ofrecen una textura crujiente y dorada por fuera, sino también una suavidad irresistible por dentro. Su diseño único permite capturar más salsa en cada bocado, haciendo que cada experiencia sea aún más sabrosa. Perfectas para acompañar hamburguesas, sándwiches, o cualquier plato principal, nuestras papas fritas crinkle aportan un toque de diversión y sabor a tu mesa. Disfruta de una explosión de sabor y textura en cada mordisco y transforma tus comidas cotidianas en momentos especiales y memorables.",
            "title": "Papa Crinkle Mccain 2.5kg",
            "thumbnailUrl": "../../../assets/images/crinkle.png"
        },
        {
            "precio":17990 ,
            "id": 5,
            "categoria":"Aceites",
            "marca": "Maxi Frits",
            "descripcion": "Descubre la calidad superior de nuestro aceite, especialmente formulado para freír tus comidas a la perfección. Este aceite es ideal para lograr frituras crujientes y doradas, manteniendo el sabor auténtico de cada ingrediente. Su alta resistencia al calor garantiza una cocción uniforme y evita la degradación rápida, permitiéndote disfrutar de platos fritos más saludables y sabrosos. Perfecto para freír desde papas y empanadas hasta pollo y mariscos, nuestro aceite es el aliado esencial en tu cocina para obtener resultados profesionales en cada preparación. Dale a tus recetas favoritas el toque perfecto con nuestro aceite de calidad superior y transforma tus comidas en experiencias culinarias inolvidables.",  
            "title": "Aceite Maxi Frits 20 Lts",
            "thumbnailUrl": "../../../assets/images/frits.png"
        },
        {
            "precio":12990 ,
            "id": 6,
            "categoria":"Aceites",
            "marca": "Maxi Frits",
            "descripcion": "Presentamos nuestro Aceite Maxi Frits de 5 litros, la elección perfecta para todas tus necesidades de freír en la cocina. Este aceite de alta calidad está diseñado para ofrecer un rendimiento excepcional, brindando una fritura crujiente y dorada con cada uso. Su fórmula avanzada resiste altas temperaturas, garantizando una cocción uniforme y reduciendo la absorción de grasa, lo que resulta en comidas más ligeras y saludables. Ideal para grandes familias, restaurantes o cualquier cocina que requiera un suministro generoso de aceite confiable, el Aceite Maxi Prits de 5 litros es perfecto para freír papas, pollo, mariscos y mucho más. Con su tamaño conveniente, puedes estar seguro de que siempre tendrás suficiente aceite a mano para todas tus necesidades culinarias. Mejora la calidad de tus frituras y disfruta de comidas deliciosas con nuestro Aceite Maxi Prits de 5 litros.",
            "title": "Aceite Maxi Frits 5 Lts",
            "thumbnailUrl": "../../../assets/images/frits5.png"
        },
        {
            "precio":15990 ,
            "id": 7,
            "categoria":"Pollo",
            "marca": "Sadia",
            "descripcion": "Descubre la deliciosa calidad de nuestros Nuggets Sadia de 2 kg, hechos con pollo de primera. Estos nuggets son el acompañamiento perfecto para cualquier comida, ofreciendo una combinación irresistible de una cubierta crujiente y un interior jugoso y tierno. Ideal para toda la familia, cada bocado está lleno de sabor y satisfacción. Su preparación es rápida y sencilla, ya sea al horno, en la freidora de aire o fritos en sartén, lo que los convierte en una opción conveniente para comidas rápidas y deliciosas. Perfectos para servir con salsas variadas, ensaladas o como parte de un plato principal, los Nuggets Sadia de 2 kg son una opción versátil y deliciosa que todos disfrutarán. Asegúrate de tener siempre a mano estos nuggets para transformar cualquier comida en una experiencia culinaria deliciosa y reconfortante.",  
            "title": "Nuggets Sadia 2 kg",
            "thumbnailUrl": "../../../assets/images/nuggets.png"
        },
        {
            "precio":12990 ,
            "id": 8,
            "categoria":"Pollo",
            "marca": "Sadia",
            "descripcion": "Disfruta de la calidad y el sabor inigualable de nuestras Alitas Chicken Wings Sadia de 2 kg. Estas alitas de pollo son perfectas para cualquier ocasión, ya sea una reunión familiar, una fiesta con amigos o una cena informal. Preparadas con los mejores ingredientes, nuestras alitas son jugosas por dentro y tienen una piel crujiente que te hará querer más.Fáciles de cocinar, puedes prepararlas al horno, en la parrilla o fritas, logrando siempre un resultado delicioso y apetitoso. Las Alitas Chicken Wings Sadia son ideales para acompañar con tus salsas favoritas, desde la clásica barbacoa hasta una picante de búfalo, adaptándose a todos los gustos. Con un tamaño conveniente de 2 kg, son perfectas para compartir y garantizar que siempre haya suficiente para todos.",
            "title": "Alitas Chicken Wings Sadia 2 kg",
            "thumbnailUrl": "../../../assets/images/alitas.png"
        },
        {
            "precio":15990,
            "id": 9,
            "categoria":"Aros de Cebolla",
            "marca": "McCain",
            "descripcion": "Descubre los exquisitos Aros de Cebolla McCain de 1,5 kg, el complemento perfecto para cualquier comida o aperitivo. Estos aros de cebolla están elaborados con cebollas frescas, rebozadas en una crujiente capa dorada que garantiza una textura inigualable y un sabor delicioso en cada mordisco. Ideales para servir como guarnición, aperitivo o incluso como un sabroso snack, los Aros de Cebolla McCain son fáciles de preparar. Puedes cocinarlos al horno, en la freidora de aire o fritos en sartén, logrando siempre un resultado perfecto en pocos minutos.",
            "title": "Aros de Cebolla McCain 1,5 kg",
            "thumbnailUrl": "../../../assets/images/aros.png"
        }
    ];
    
    
    getProducts(): Product[]{
        return this.products;
    }
    
    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }
}