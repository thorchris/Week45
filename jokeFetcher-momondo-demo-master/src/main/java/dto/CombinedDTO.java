package dto;

public class CombinedDTO {
    String dadID;
    String dadValue;
    String chuckID;
    String chuckValue;

    public CombinedDTO(ChuckDTO ct, DadDTO dt) {
        dadID = dt.getId();
        dadValue = dt.getValue();
        chuckID = ct.getId();
        chuckValue = ct.getValue();
    }

    public String getDadID() {
        return dadID;
    }

    public void setDadID(String dadID) {
        this.dadID = dadID;
    }

    public String getDadValue() {
        return dadValue;
    }

    public void setDadValue(String dadValue) {
        this.dadValue = dadValue;
    }

    public String getChuckID() {
        return chuckID;
    }

    public void setChuckID(String chuckID) {
        this.chuckID = chuckID;
    }

    public String getChuckValue() {
        return chuckValue;
    }

    public void setChuckValue(String chuckValue) {
        this.chuckValue = chuckValue;
    }
    

    
}


