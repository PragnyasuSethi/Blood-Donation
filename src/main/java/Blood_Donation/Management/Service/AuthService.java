package Blood_Donation.Management.Service;

import Blood_Donation.Management.Model.User;
import Blood_Donation.Management.Repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepo repo;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       return repo.save(user);
    }

    public boolean signIn(String email, String password) {
        Optional<User> optionalUser = repo.findByEmail(email);


        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return passwordEncoder.matches(password, user.getPassword());
        }

        return false;
    }
}
