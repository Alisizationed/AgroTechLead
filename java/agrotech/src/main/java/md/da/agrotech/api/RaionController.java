package md.da.agrotech.api;

import lombok.RequiredArgsConstructor;
import md.da.agrotech.entity.Raion;
import md.da.agrotech.service.AgricultureService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/raion")
public class RaionController {
    private final AgricultureService agricultureService;

    @GetMapping("/{id}")
    public Mono<Raion> getRaion(@PathVariable Long id) {
        return agricultureService.getRaionById(id);
    }
}
