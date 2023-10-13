import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamServiceService } from '../services/team-service.service';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css'],
})
export class AddTeamMemberComponent implements OnInit {
  teamMemberForm: FormGroup; // Initialize taskForm here;
  teams: any[] = []; // Store teams fetched from the backend.
  users: any[] = []; // Store users fetched from the backend.

  constructor(
    private fb: FormBuilder,
    private teamService: TeamServiceService // Inject the TeamService.
  ) {
    this.teamMemberForm = this.fb.group({
      teamName: [''], // Team name input
      selectedUserIds: [''], // Selected user input
    });
  }

  ngOnInit(): void {
    // Fetch teams and users from the backend using the TeamService.
    this.teamService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
    this.teamService.getTeams().subscribe((team) => {
      this.teams = team;
      // console.log(this.teams);
    });
  }

  onSubmit() {
    // Retrieve the team name and selected user ID from the form.
    const teamName = this.teamMemberForm.value.teamName;
    const selectedUserId = this.teamMemberForm.value.selectedUserIds;
    console.log(selectedUserId);

    // Send a request to add the selected user to the specified team.
    // You need to implement this functionality in your TeamServiceService.
    this.teamService.addTeamMember(teamName, selectedUserId);

    // Reset the form after submission (optional).
    this.teamMemberForm.reset();
  }
  getProjects() {}
}
