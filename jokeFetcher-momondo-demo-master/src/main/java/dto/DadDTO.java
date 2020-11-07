package dto;

public class DadDTO {
    private String joke;
    private String id;

    public DadDTO(String value, String id) {
        this.joke = value;
        this.id = id;
    }
  
    public String getValue() {
        return joke;
    }

    public void setValue(String value) {
        this.joke = value;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    
    
}
