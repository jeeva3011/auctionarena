import {gql} from '@apollo/client'

export const UPDATE_TEAM_POINTS = gql`
    mutation updateTeamPoints($updateTeamPointsInput: UpdateTeamPointsInput!){
        updateTeamPoints(updateTeamPointsInput:$updateTeamPointsInput)
    }
`