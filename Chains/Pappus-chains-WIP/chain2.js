// class SteinerChain
// {
//     constructor()
//    { this.width = 5;
//     this.height = 5;
//     let array = [13, 7, 11, 5, 3 ];
//  }
//     void Start()
//     {
//         S();
//     }
 
//     void S(float radius = 0, int d = 0, int r = 0)
//     {
//         int n = array[d];
//         float i = (radius - radius * Mathf.Sin(Mathf.PI / n)) / (Mathf.Sin(Mathf.PI / n) + 1);
 
//         if (d++ < array.Length)
//         {
//             S(i, d, n);
//             for (; r < n; ++r)
//             {
//                 // save(); transform
//                 // translate(0, (o + i) / 2); origin to middle of the 2 base circles
//                 S((radius - i) / 2, d);
//                 // restore(); transform
//                 // rotate((2 * PI) / n); transform
//             }
//         }
//     }
// }