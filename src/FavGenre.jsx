// import * as React from 'react';


// function FavGenreProp(props) {
//     return (
//         <>
//             <ul>
//                 {props.id}
//                 <li>Genre name: {props.name}</li>
//                 <li>Genre description: {props.description}</li>
//             </ul>
//         </>
//     )
// }

// function FavGenreList() {
//     const [data, setData] = React.useState(false);
//   let { personId } = useParams();
//   const GET_P_FAVGENRE = `https://localhost:7130/api/FavGenre/GetGenresByPersonId/${personId}`;

//   React.useEffect(() => {
//     const fetchData = async () => {
//         const result = await axios(GET_P_FAVGENRE);
//         console.log(result)
//         setData(result.data);
//     };

//     fetchData();
// }, []);

//     return (
//         <>
//             <h1>genreList</h1>

//             {data.map(p => (
//                 <FavGenreProp
//                     name={p.name}
//                     description={p.description}
//                     id={p.id} />
//             ))}
//         </>
//     )
// }

// export default FavGenreList;