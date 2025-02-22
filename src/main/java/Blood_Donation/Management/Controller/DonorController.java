package Blood_Donation.Management.Controller;

import Blood_Donation.Management.Model.Donor;
import Blood_Donation.Management.Service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donors")
@CrossOrigin(origins = "http://127.0.0.1:5500/Dashboard.html")

public class DonorController {
    @Autowired
    private DonorService service;

    @PostMapping("/register")
    public ResponseEntity<?> registerDonor(@RequestBody Donor donor) {
        System.out.println("Received Data: " + donor.toString());

        if (donor.getBloodGroup() == null || donor.getBloodGroup().isEmpty()) {
            System.out.println("Blood Group is NULL or EMPTY!");
            return ResponseEntity.badRequest().body("Blood Group is required!");
        }

        return service.registerDonor(donor);
    }

    @GetMapping("/search")
    public List<Donor> searchDonor(@RequestParam(required = false) String bloodGroup, @RequestParam(required = false) Integer age) {
        if (bloodGroup != null && age != null) {
            return service.searchDonor(bloodGroup, age);
        } else if (bloodGroup != null) {
            return service.searchByBloodGroup(bloodGroup);
        } else if (age != null) {
            return service.searchByAge(age);
        }else {
            return List.of();
        }
    }
}
