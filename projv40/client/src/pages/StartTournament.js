import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";

const TournamentUpdates = () => {
  const [teams, setTeams] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const [tournament, setTournament] = useState({});
  const [inputs, setInputs] = useState({});
  const [user,setUser] = useState('');
  const uId = localStorage.getItem("userId");
  // const [inputs, setInputs] = useState({
  //   // result: "",
  //   // result1: "",
  //   // result2: "",
  //   // result3: "",
  // });

  //const numRounds = 3; // Załóżmy, że drabinka ma 3 rundy

  useEffect(() => {


    const getUser = async () => {
      try {
        const {data} = await axios.get(`/api/v1/user/get-user/${uId}`);
        setUser(data?.user);
      } catch (error) {
        console.log(error);
      }
    }

    const getTournamentUpdate = async () => {
      try {
        const tournamentId = localStorage.getItem("tournamentId");
        const { data } = await axios.get(`/api/v1/tournament/get-tournament/${tournamentId}`);
        if (data?.success) {
          setTournament(data?.tournament);
          setInputs({
            title: data?.tournament.title,
            description: data?.tournament.description,
            image: data?.tournament.image,
            city: data?.tournament.city,
            county: data?.tournament.county,
            province: data?.tournament.province,
            street: data?.tournament.street,
            buildingAddress: data?.tournament.buildingAddress,
            time: data?.tournament.time,
            userName: data?.tournament?.user?.username,
            refName: data?.tournament?.referee?.firstName,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };





    const getTournamentTeams = async () => {
      try {
        const tournamentId = localStorage.getItem("tournamentId");
        if (!tournamentId) {
          console.log("tournamentId not found in localStorage");
          return;
        }
        const { data } = await axios.get(`/api/v1/team/tournament-teams/${tournamentId}`);
        if (data?.success) {
          
          // Dodaj pole "results" do każdego zespołu
          const teamsWithResults = data.teams.map((team) => ({
            ...team,
            // results: team.results, // [Result 1, Result 2]
            result1: team.result1,
            result2: team.result2,
            result3: team.result3,

          }));
          setTeams(teamsWithResults);
        } else {
          console.log("No teams found for the specified tournament");
        }
      } catch (error) {
        console.log("Error in retrieving teams:", error);
      }
    };
    getTournamentUpdate();
    getTournamentTeams();
    getUser();
  }, [id]);

  // const handleStart = () => {
  //   // Tutaj umieść logikę rozpoczęcia turnieju
  //   // Możesz losować pary meczowe na pierwszą rundę i zaktualizować stan drabinki
  // };

  const handleChangeResult1 = async (teamIndex, newValue) => {
    try {
      // Klonuj stan drużyn
      const updatedTeams = [...teams];
      // Zaktualizuj wynik w odpowiednim miejscu
      // updatedTeams[teamIndex].results = newValue;
      updatedTeams[teamIndex].result1 = newValue

      // Ustaw zaktualizowany stan
      setTeams(updatedTeams);

      // Zapisz wynik do bazy danych
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        // results: newValue,
        result1: newValue,
      });

      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };



  const handleChangeResult2 = async (teamIndex, newValue) => {
    try {
      // Klonuj stan drużyn
      const updatedTeams = [...teams];
      // Zaktualizuj wynik w odpowiednim miejscu
      // updatedTeams[teamIndex].results = newValue;
      updatedTeams[teamIndex].result2 = newValue

      // Ustaw zaktualizowany stan
      setTeams(updatedTeams);

      // Zapisz wynik do bazy danych
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        // results: newValue,
        result2: newValue,
      });

      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };



  const handleChangeResult3 = async (teamIndex, newValue) => {
    try {
      // Klonuj stan drużyn
      const updatedTeams = [...teams];
      // Zaktualizuj wynik w odpowiednim miejscu
      // updatedTeams[teamIndex].results = newValue;
      updatedTeams[teamIndex].result3 = newValue

      // Ustaw zaktualizowany stan
      setTeams(updatedTeams);

      // Zapisz wynik do bazy danych
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        // results: newValue,
        result3: newValue,
      });

      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };

  return (
    <Card
      sx={{
        width: "80%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardContent>
        {teams && teams.length > 0 ? (
          <Table>
            <TableHead>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Ćwierćfinały</Typography>
            <TableRow>
  <TableCell width={300} style={{ textAlign: 'left', fontWeight: 'bold', color: 'grey' }}>Team1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 2</TableCell>
  <TableCell style={{ textAlign: 'right', fontWeight: 'bold', color: 'grey' }}>Team2</TableCell>
</TableRow>
            </TableHead>
            <TableBody>
            
              {Array.from({ length: 4 }, (_, index) => (
                <TableRow key={index}>
                  {console.log("teststtsts"+teams[index * 2]?.teamName )}
                  <TableCell style={{ textAlign: 'left'}}>{teams[index * 2].teamName}</TableCell>
                  {(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin")? (
                    <>
                  <TableCell style={{ textAlign: 'center'}}>
                    <TextField 
                      type="number"
                      placeholder={teams[index * 2].result1}
                      value={teams[index * 2].result1}
                      onChange={(e) => handleChangeResult1(index * 2, e.target.value)}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: 'center'}}>
                    <TextField
                      type="number"
                      placeholder={teams[index * 2 + 1].result1}
                      value={teams[index * 2 + 1].result1}
                      onChange={(e) => handleChangeResult1(index * 2 + 1, e.target.value)}
                    />
                  </TableCell>
                  </>
                  ):(
                    <>
                      <TableCell style={{ textAlign: 'center'}}>{teams[index * 2].result1}</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>{teams[index * 2 + 1].result1}</TableCell>
                    </>
                  ) 
                
                }
                  <TableCell style={{ textAlign: 'right'}}>{teams[index * 2 + 1].teamName}</TableCell>
                </TableRow>
              ))}





{(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") ? (
                    <>
<Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Półfinały</Typography>
<TableRow>
  <TableCell width={300} style={{ textAlign: 'left', fontWeight: 'bold', color: 'grey' }}>Team1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 2</TableCell>
  <TableCell style={{ textAlign: 'right', fontWeight: 'bold', color: 'grey' }}>Team2</TableCell>
</TableRow>
{Array.from({ length: 2 }, (_, index) => (
                <TableRow key={index}>


{teams[index * 4].result1 < teams[index * 4 + 1].result1 && (
  <>
    <TableCell style={{ textAlign: 'left'}} >{teams[index * 4 + 1 ].teamName}</TableCell>
    
    <TableCell style={{ textAlign: 'center'}}>
      <TextField
        type="number"
        placeholder={teams[index * 4  + 1 ].result2}
        value={teams[index * 4 + 1 ].result2}
        onChange={(e) => handleChangeResult2(index * 4 + 1, e.target.value)}
      />
    </TableCell>
    
  </>
)}
{teams[index * 4].result1 > teams[index * 4 + 1].result1 && (
  <>
    <TableCell style={{ textAlign: 'left'}}>{teams[index * 4].teamName}</TableCell>
    
    <TableCell style={{ textAlign: 'center'}}>
      <TextField
        type="number"
        placeholder={teams[index * 4].result2}
        value={teams[index * 4].result2}
        onChange={(e) => handleChangeResult2(index * 4, e.target.value)}
      />
    </TableCell>
  </>
)}
{teams[index * 4].result1 === teams[index * 4 + 1].result1 && (
  <>
    <TableCell style={{ textAlign: 'left'}}>Brak danych</TableCell>
    
    <TableCell style={{ textAlign: 'center'}}>
      <TextField
        type="number"
        placeholder="Oczekiwanie"
        value={0}
      />
    </TableCell>
  </>
)}

{teams[index * 4+2].result1 > teams[index * 4 + 3].result1 && (
  <>
  
    <TableCell style={{ textAlign: 'center'}}>
    
      <TextField
        type="number"
        placeholder={teams[index * 4  + 2 ].result2}
        value={teams[index * 4 + 2 ].result2}
        onChange={(e) => handleChangeResult2(index * 4 + 2, e.target.value)}
      />
    </TableCell>
    <TableCell style={{ textAlign: 'right'}}>{teams[index * 4 + 2 ].teamName}</TableCell>
  </>
)}
{teams[index * 4 + 2].result1 < teams[index * 4 + 3].result1 && (
  <>
  
    <TableCell style={{ textAlign: 'center'}}>
    
      <TextField
        type="number"
        placeholder={teams[index * 4 + 3].result2}
        value={teams[index * 4 + 3].result2}
        onChange={(e) => handleChangeResult2(index * 4 + 3, e.target.value)}
      />
    </TableCell>
    <TableCell style={{ textAlign: 'right'}}>{teams[index * 4 + 3].teamName}</TableCell>
  </>
)}
{teams[index * 4+2].result1 === teams[index * 4 + 3].result1 && (
  <>
    
    <TableCell style={{ textAlign: 'center'}}>
      <TextField
        type="number"
        placeholder="Oczekiwanie"
        value={0}
      />
    </TableCell>
    <TableCell style={{ textAlign: 'rught'}}>Brak danych</TableCell>
  </>
)}
          
                </TableRow>
                
              ))}

</>):(
  <>
  <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Półfinały</Typography>
  <TableRow>
  <TableCell width={300} style={{ textAlign: 'left', fontWeight: 'bold', color: 'grey' }}>Team1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 2</TableCell>
  <TableCell style={{ textAlign: 'right', fontWeight: 'bold', color: 'grey' }}>Team2</TableCell>
</TableRow>
  {Array.from({ length: 2 }, (_, index) => (
                  <TableRow key={index}>
  
  
  {teams[index * 4].result1 < teams[index * 4 + 1].result1 && (
    <>
      <TableCell style={{ textAlign: 'left'}}>{teams[index * 4 + 1 ].teamName}</TableCell>
      
      <TableCell style={{ textAlign: 'center'}}>{teams[index * 4  + 1 ].result2}</TableCell>
      
    </>
  )}
  {teams[index * 4].result1 > teams[index * 4 + 1].result1 && (
    <>
      <TableCell style={{ textAlign: 'left'}}>{teams[index * 4].teamName}</TableCell>
      
      <TableCell style={{ textAlign: 'center'}}>{teams[index * 4].result2}</TableCell>
    </>
  )}
  {teams[index * 4].result1 === teams[index * 4 + 1].result1 && (
    <>
      <TableCell style={{ textAlign: 'left'}}>Brak danych</TableCell>
      
      <TableCell style={{ textAlign: 'center'}}>{0}
      </TableCell>
    </>
  )}
  
  {teams[index * 4+2].result1 > teams[index * 4 + 3].result1 && (
    <>
    
      <TableCell style={{ textAlign: 'center'}}>{teams[index * 4  + 2 ].result2}</TableCell>
      <TableCell style={{ textAlign: 'right'}}>{teams[index * 4 + 2 ].teamName}</TableCell>
    </>
  )}
  {teams[index * 4 + 2].result1 < teams[index * 4 + 3].result1 && (
    <>
    
      <TableCell style={{ textAlign: 'center'}}>{teams[index * 4 + 3].result2}
      </TableCell>
      <TableCell style={{ textAlign: 'right'}}>{teams[index * 4 + 3].teamName}</TableCell>
    </>
  )}
  {teams[index * 4+2].result1 === teams[index * 4 + 3].result1 && (
    <>
      
      <TableCell style={{ textAlign: 'center'}}>{0}
      </TableCell>
      <TableCell style={{ textAlign: 'right'}}>Brak danych</TableCell>
    </>
  )}
            
                  </TableRow>
                  
                ))}
</>)
}           


{(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin")? (
                    <>
<Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Finał</Typography>
<TableRow>
  <TableCell width={300} style={{ textAlign: 'left', fontWeight: 'bold', color: 'grey' }}>Team1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 2</TableCell>
  <TableCell style={{ textAlign: 'right', fontWeight: 'bold', color: 'grey' }}>Team2</TableCell>
</TableRow>

{Array.from({ length: 1 }, (_, index) => (
                <TableRow key={index}>



                  {teams[index].result2 > teams[index + 1].result2 && teams[index].result2 > teams[index + 2].result2 && teams[index].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index ].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>
                      <TextField
                        type="number"
                        placeholder={teams[index ].result3}
                        value={teams[index ].result3}
                        onChange={(e) => handleChangeResult3(index, e.target.value)}
                      />
                    </TableCell>
                    </>
                  )}
                  {teams[index + 1].result2 > teams[index ].result2 && teams[index + 1].result2 > teams[index + 2].result2 && teams[index + 1].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index + 1].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>
                      <TextField
                        type="number"
                        placeholder={teams[index +1].result3}
                        value={teams[index + 1].result3}
                        onChange={(e) => handleChangeResult3(index + 1, e.target.value)}
                      />
                    </TableCell>
                    </>
                  )}
                  {teams[index + 2].result2 > teams[index + 1].result2 && teams[index + 2].result2 > teams[index].result2 && teams[index + 2].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index +2].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>
                      <TextField
                        type="number"
                        placeholder={teams[index +2].result3}
                        value={teams[index +2].result3}
                        onChange={(e) => handleChangeResult3(index+2, e.target.value)}
                      />
                    </TableCell>
                    </>
                  )}
                  {teams[index + 3].result2 > teams[index + 1].result2 && teams[index + 3].result2 > teams[index + 2].result2 && teams[index + 3].result2 > teams[index ].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index +3].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>
                      <TextField
                        type="number"
                        placeholder={teams[index +3].result3}
                        value={teams[index +3].result3}
                        onChange={(e) => handleChangeResult3(index+3, e.target.value)}
                      />
                    </TableCell>
                    </>
                  )}

{teams[index+4].result2 > teams[index + 5].result2 && teams[index+4].result2 > teams[index + 6].result2 && teams[index+4].result2 > teams[index + 7].result2 && (
                
                    <>
                  <TableCell style={{ textAlign: 'center'}}>
                    <TextField
                      type="number"
                      placeholder={teams[index +4].result3}
                      value={teams[index +4].result3}
                      onChange={(e) => handleChangeResult3(index +4, e.target.value)}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: 'right'}}>{teams[index  + 4].teamName}</TableCell>
                  </>
                  )}
                  {teams[index+5].result2 > teams[index + 4].result2 && teams[index+5].result2 > teams[index + 6].result2 && teams[index+5].result2 > teams[index + 7].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>
                <TextField
                  type="number"
                  placeholder={teams[index +5].result3}
                  value={teams[index +5].result3}
                  onChange={(e) => handleChangeResult3(index +5, e.target.value)}
                />
              </TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 5].teamName}</TableCell>
              </>
              )}
              {teams[index+6].result2 > teams[index + 5].result2 && teams[index+6].result2 > teams[index + 4].result2 && teams[index+6].result2 > teams[index + 7].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>
                <TextField
                  type="number"
                  placeholder={teams[index +6].result3}
                  value={teams[index +6].result3}
                  onChange={(e) => handleChangeResult3(index +6, e.target.value)}
                />
              </TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 6].teamName}</TableCell>
              </>
              )}
{teams[index+7].result2 > teams[index + 5].result2 && teams[index+7].result2 > teams[index + 6].result2 && teams[index+7].result2 > teams[index + 4].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>
                <TextField
                  type="number"
                  placeholder={teams[index +7].result3}
                  value={teams[index +7].result3}
                  onChange={(e) => handleChangeResult3(index +7, e.target.value)}
                />
              </TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 7].teamName}</TableCell>
              </>
              )}
                
                
                </TableRow>
              ))}



</>):(
  <>
  <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Finał</Typography>
  <TableRow>
  <TableCell width={300} style={{ textAlign: 'left', fontWeight: 'bold', color: 'grey' }}>Team1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 1</TableCell>
  <TableCell style={{ textAlign: 'center' , fontWeight: 'bold', color: 'grey' }}>Result 2</TableCell>
  <TableCell style={{ textAlign: 'right', fontWeight: 'bold', color: 'grey' }}>Team2</TableCell>
</TableRow>

{Array.from({ length: 1 }, (_, index) => (
                <TableRow key={index}>



                  {teams[index].result2 > teams[index + 1].result2 && teams[index].result2 > teams[index + 2].result2 && teams[index].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index ].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{teams[index ].result3}</TableCell>
                    </>
                  )}
                  {teams[index + 1].result2 > teams[index ].result2 && teams[index + 1].result2 > teams[index + 2].result2 && teams[index + 1].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index + 1].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{teams[index +1].result3}</TableCell>
                    </>
                  )}
                  {teams[index + 2].result2 > teams[index + 1].result2 && teams[index + 2].result2 > teams[index].result2 && teams[index + 2].result2 > teams[index + 3].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index +2].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{teams[index +2].result3}</TableCell>
                    </>
                  )}
                  {teams[index + 3].result2 > teams[index + 1].result2 && teams[index + 3].result2 > teams[index + 2].result2 && teams[index + 3].result2 > teams[index ].result2 && (
                  <>
                    <TableCell style={{ textAlign: 'left'}}>{teams[index +3].teamName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{teams[index +3].result3}</TableCell>
                    </>
                  )}

{teams[index+4].result2 > teams[index + 5].result2 && teams[index+4].result2 > teams[index + 6].result2 && teams[index+4].result2 > teams[index + 7].result2 && (
                
                    <>
                  <TableCell style={{ textAlign: 'center'}}>{teams[index +4].result3}</TableCell>
                  <TableCell style={{ textAlign: 'right'}}>{teams[index  + 4].teamName}</TableCell>
                  </>
                  )}
                  {teams[index+5].result2 > teams[index + 4].result2 && teams[index+5].result2 > teams[index + 6].result2 && teams[index+5].result2 > teams[index + 7].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>{teams[index +5].result3}</TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 5].teamName}</TableCell>
              </>
              )}
              {teams[index+6].result2 > teams[index + 5].result2 && teams[index+6].result2 > teams[index + 4].result2 && teams[index+6].result2 > teams[index + 7].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>{teams[index +6].result3}</TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 6].teamName}</TableCell>
              </>
              )}
{teams[index+7].result2 > teams[index + 5].result2 && teams[index+7].result2 > teams[index + 6].result2 && teams[index+7].result2 > teams[index + 4].result2 && (
                
                <>
              <TableCell style={{ textAlign: 'center'}}>{teams[index +7].result3}</TableCell>
              <TableCell style={{ textAlign: 'right'}}>{teams[index  + 7].teamName}</TableCell>
              </>
              )}
                
                
                </TableRow>
              ))}
  </>
)}



            </TableBody>
          </Table>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "auto",
              marginBottom: "auto",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4>Nie dodano jeszcze żadnego zespołu.</h4>
            <p>Dodaj swoją drużynę</p>
          </div>
        )}
  
        <Box mt={4}>
          <Typography variant="h6" color="text.secondary">
            Drabinka turniejowa:
          </Typography>
          <Button variant="contained" disabled={teams.length !== 8}>
            Rozpocznij turniej
          </Button>
          {/* Tutaj możesz dodać kod do wyświetlania drabinki turniejowej */}
        </Box>
      </CardContent>
    </Card>
  );
  
};

export default TournamentUpdates;