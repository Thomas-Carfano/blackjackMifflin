// const Bet = ({currentHandBet, setCurrentHandBet, betSize, setBetSize}) => {

//   const betHandler = async (e) => {
//     e.preventDefault();
//     setCurrentHandBet(betSize);
//     const id = 1;
//     const response = await fetch(`/api/players/bet/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ balance: 0 - betSize }),
//     });
//     const result = await response.json();
//     console.log(result);
//   };

//   return (
//     <>
//       <h3>Bet Size: {currentHandBet}</h3>
//       <form onSubmit={betHandler}>
//         <input
//           type="number"
//           min="0"
//           onChange={(e) => setBetSize(e.target.value)}
//         />
//         <button>Bet</button>
//       </form>

//     </>
//   )
// }

// export default Bet;