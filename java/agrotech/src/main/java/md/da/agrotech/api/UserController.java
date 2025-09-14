package md.da.agrotech.api;

import lombok.RequiredArgsConstructor;
import md.da.agrotech.entity.Cadastru;
import md.da.agrotech.service.AgricultureService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final AgricultureService agricultureService;

    @GetMapping("/{id}")
    public Flux<Cadastru> getCadastru(@PathVariable String id) {
        return agricultureService.getCadastruByUserId(id);
    }
}
