package Blood_Donation.Management.Controller;
import Blood_Donation.Management.Model.User;
import Blood_Donation.Management.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://blood-donation-beige.vercel.app/")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user){
        return ResponseEntity.ok(authService.signup(user));
    }

    @PostMapping("/signIn")
    public ResponseEntity<Boolean> signIn(@RequestBody User user) {
        return ResponseEntity.ok(authService.signIn(user.getEmail(), user.getPassword()));
    }
}