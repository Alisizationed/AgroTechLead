package md.da.agrotech.api;

import lombok.RequiredArgsConstructor;
import md.da.agrotech.DTO.CadastruCropDTO;
import md.da.agrotech.DTO.CadastruLivestockDTO;
import md.da.agrotech.DTO.CropDTO;
import md.da.agrotech.DTO.LivestockDTO;
import md.da.agrotech.entity.Cadastru;
import md.da.agrotech.entity.CadastruCrop;
import md.da.agrotech.service.AgricultureService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cadastru")
public class CadastruController {
    private final AgricultureService agricultureService;
    @PostMapping()
    public Mono<Cadastru> saveCadastru(@RequestBody Cadastru cadastru) {
        return agricultureService.createCadastru(cadastru);
    }
    @GetMapping()
    public Flux<Cadastru> getCadastres() {
        return agricultureService.getCadastres();
    }

    @GetMapping("/{id}")
    public Mono<Cadastru> getCadastru(@PathVariable Long id) {
        return agricultureService.getCadastruById(id);
    }


    @GetMapping("/crop")
    public Flux<CadastruCropDTO> getCadastruByCrop(@RequestParam String crop) {
        return agricultureService.getCadastruByCrop(crop);
    }

    @GetMapping("/livestock")
    public Flux<CadastruLivestockDTO> getCadastruByLivestock(@RequestParam String livestock) {
        return agricultureService.getCadastruByLivestock(livestock);
    }

    @GetMapping("/{id}/crops")
    public Flux<CropDTO> getCrops(@PathVariable Long id) {
        return agricultureService.getCropByCadastru(id);
    }

    @GetMapping("/{id}/livestock")
    public Flux<LivestockDTO> getLivestock(@PathVariable Long id) {
        return agricultureService.getLivestockByCadastru(id);
    }
}
